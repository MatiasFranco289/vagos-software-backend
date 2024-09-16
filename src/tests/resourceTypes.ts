import app from "..";
import {
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_NOT_FOUND,
  STATUS_CODE_OK,
} from "../constants";
import {
  RESOURCE_TYPE_NOT_FOUND_MESSAGE,
  RESOURCE_TYPE_SUCCESSFULLY_UPDATED,
  RESOURCE_TYPES_SUCCESSFULLY_RETRIEVED_MESSAGE,
} from "../controllers/resourceTypes";
import { ApiResponse } from "../interfaces";
import ResourceType from "../models/ResourceType";
import request from "supertest";

export const getAllResourceTypesTest = () => {
  describe("GET /api/admin/resources/types", () => {
    const resourceTypesToCreate = [
      {
        name: "TEST1",
      },
      {
        name: "TEST2",
      },
      {
        name: "TEST3",
      },
    ];

    beforeAll(async () => {
      await ResourceType.bulkCreate(resourceTypesToCreate);
    });

    afterAll(async () => {
      await ResourceType.destroy({ where: {} });
    });

    it("Should return a list with all the existing resource types", async () => {
      const response = await request(app)
        .get("/api/admin/resources/types")
        .set("Cookie", global.accessToken);

      const bodyResponse: ApiResponse<any> = response.body;
      const resourceTypesNames = bodyResponse.data.map((resourceType) => {
        return resourceType.name;
      });

      expect(response.status).toBe(STATUS_CODE_OK);
      expect(bodyResponse.status_code).toBe(STATUS_CODE_OK);
      expect(bodyResponse.message).toBe(
        RESOURCE_TYPES_SUCCESSFULLY_RETRIEVED_MESSAGE
      );
      expect(bodyResponse.data.length).toEqual(3);
      expect(resourceTypesNames).toEqual(
        resourceTypesToCreate.map((typeToCreate) => {
          return typeToCreate.name;
        })
      );
    });
  });
};

export const createResourceTypeTest = () => {
  describe("POST /api/admin/resources/types", () => {
    const resourceTypeToCreate = {
      name: "test",
    };

    beforeAll(async () => {
      await ResourceType.create(resourceTypeToCreate);
    });

    afterAll(async () => {
      await ResourceType.destroy({ where: {} });
    });

    it("Should return an error 400 if resource_name is not passed", async () => {
      const response = await request(app)
        .post("/api/admin/resources/types")
        .set("Cookie", global.accessToken)
        .send({});

      const bodyResponse: ApiResponse<any> = response.body;

      expect(response.status).toBe(STATUS_CODE_BAD_REQUEST);
      expect(bodyResponse.status_code).toBe(STATUS_CODE_BAD_REQUEST);
    });

    it("Should return an error 400 if duplicated resource_name is passed", async () => {
      const response = await request(app)
        .post("/api/admin/resources/types")
        .set("Cookie", global.accessToken)
        .send(resourceTypeToCreate);

      const bodyResponse: ApiResponse<any> = response.body;

      expect(response.status).toBe(STATUS_CODE_BAD_REQUEST);
      expect(bodyResponse.status_code).toBe(STATUS_CODE_BAD_REQUEST);
      expect(bodyResponse.message).toBe("name must be unique");
      expect(bodyResponse.data).toEqual([]);
    });
  });
};

export const updatedResourceTypeTest = () => {
  describe("PUT /api/admin/resources/types", () => {
    beforeAll(async () => {
      await ResourceType.bulkCreate([
        {
          id: 1,
          name: "test",
        },
        {
          id: 2,
          name: "test2",
        },
      ]);
    });

    afterAll(async () => {
      await ResourceType.destroy({ where: {} });
    });

    it("Should return a 404 error if the provided id does not match any resource type", async () => {
      const response = await request(app)
        .put("/api/admin/resources/types/100")
        .set("Cookie", global.accessToken)
        .send({
          name: "updateTest",
        });

      const bodyResponse: ApiResponse<any> = response.body;

      expect(response.status).toBe(STATUS_CODE_NOT_FOUND);
      expect(bodyResponse.status_code).toBe(STATUS_CODE_NOT_FOUND);
      expect(bodyResponse.message).toBe(RESOURCE_TYPE_NOT_FOUND_MESSAGE);
    });

    it("Should return a 400 error if the name is not passed", async () => {
      const response = await request(app)
        .put("/api/admin/resources/types/1")
        .set("Cookie", global.accessToken)
        .send({});

      const bodyResponse: ApiResponse<any> = response.body;

      expect(response.status).toBe(STATUS_CODE_BAD_REQUEST);
      expect(bodyResponse.status_code).toBe(STATUS_CODE_BAD_REQUEST);
    });

    it("Should return a 400 error if the resource type name is not unique", async () => {
      const response = await request(app)
        .put("/api/admin/resources/types/1")
        .set("Cookie", global.accessToken)
        .send({
          name: "test2",
        });

      const bodyResponse: ApiResponse<any> = response.body;

      expect(response.status).toBe(STATUS_CODE_BAD_REQUEST);
      expect(bodyResponse.status_code).toBe(STATUS_CODE_BAD_REQUEST);
      expect(bodyResponse.message).toBe("name must be unique");
    });

    it("Should successfully update the resource type if everything is ok", async () => {
      const response = await request(app)
        .put("/api/admin/resources/types/1")
        .set("Cookie", global.accessToken)
        .send({
          name: "updateTest",
        });

      const bodyResponse: ApiResponse<any> = response.body;

      expect(response.status).toBe(STATUS_CODE_OK);
      expect(bodyResponse.status_code).toBe(STATUS_CODE_OK);
      expect(bodyResponse.message).toBe(RESOURCE_TYPE_SUCCESSFULLY_UPDATED);
    });
  });
};
