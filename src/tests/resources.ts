import app from "../index";
import request from "supertest";
import Role from "../models/Role";
import UserStatus from "../models/UserStatus";
import User from "../models/User";
import ProjectStatus from "../models/ProjectStatus";
import { encryptPassword } from "../utils";
import ResourceType from "../models/ResourceType";
import Project from "../models/Project";
import {
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_CREATED,
  STATUS_CODE_OK,
} from "../constants";
import { ApiResponse } from "../interfaces";
import {
  NO_PROJECT_FOUND_MESSAGE,
  NO_RESOURCE_TYPE_FOUND_MESSAGE,
  RESOURCE_SUCCESSFULLY_CREATED,
} from "../controllers/resources";
import Resource from "../models/Resource";

export const resourcesTest = () =>
  describe("POST /api/admin/projects/resources", () => {
    let adminRole: Role;
    let activeStatus: UserStatus;
    let encryptedUserPassword: string;
    let user: User;
    let accessToken: string;
    let projectStatus: ProjectStatus;

    beforeAll(async () => {
      projectStatus = await ProjectStatus.create({
        id: 1,
        name: "ACTIVE",
      });

      await ResourceType.create({
        id: 1,
        name: "test_resource",
      });

      await Project.create({
        id: 1,
        title: "test",
        thumbnailUrl: "www.test.png",
        description: "test description",
        startDate: "2024-08-13",
        endDate: "2024-08-13",
        expectedEndDate: "2024-08-13",
        repositoryUrl: "www.github.com",
        statusId: 1,
        creatorId: 1,
      });
    });

    afterAll(async () => {
      await Resource.destroy({ where: {} });
      await ResourceType.destroy({ where: {} });
      await Project.destroy({ where: {} });
      await ProjectStatus.destroy({ where: {} });
    });

    it("Should successfully create a resource.", async () => {
      const response = await request(app)
        .post("/api/admin/projects/resources")
        .set("Cookie", global.accessToken)
        .send({
          url: "www.test.com",
          type_id: 1,
          project_id: 1,
        });

      const bodyResponse: ApiResponse<any> = response.body;
      expect(response.status).toEqual(STATUS_CODE_CREATED);
      expect(bodyResponse.status_code).toEqual(STATUS_CODE_CREATED);
      expect(bodyResponse.message).toBe(RESOURCE_SUCCESSFULLY_CREATED);
    });

    it("Should return error if invalid project_id is passed", async () => {
      const response = await request(app)
        .post("/api/admin/projects/resources")
        .set("Cookie", global.accessToken)
        .send({
          url: "www.test.com",
          type_id: 1,
          project_id: 3,
        });

      const bodyResponse: ApiResponse<any> = response.body;

      expect(response.status).toEqual(STATUS_CODE_BAD_REQUEST);
      expect(bodyResponse.status_code).toEqual(STATUS_CODE_BAD_REQUEST);
      expect(bodyResponse.message).toBe(NO_PROJECT_FOUND_MESSAGE);
    });

    it("Should return error if invalid type_id is passed", async () => {
      const response = await request(app)
        .post("/api/admin/projects/resources")
        .set("Cookie", global.accessToken)
        .send({
          url: "www.test.com",
          type_id: 3,
          project_id: 1,
        });

      const bodyResponse: ApiResponse<any> = response.body;

      expect(response.status).toEqual(STATUS_CODE_BAD_REQUEST);
      expect(bodyResponse.status_code).toEqual(STATUS_CODE_BAD_REQUEST);
      expect(bodyResponse.message).toBe(NO_RESOURCE_TYPE_FOUND_MESSAGE);
    });
  });
