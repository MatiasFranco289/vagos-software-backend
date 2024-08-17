import Role from "../models/Role";
import User from "../models/User";
import UserStatus from "../models/UserStatus";
import { encryptPassword } from "../utils";
import request from "supertest";
import app from "../../src/index";
import Tag from "../models/Tag";
import { STATUS_CODE_OK } from "../constants";
import { ApiResponse } from "../interfaces";
import { TAGS_RETRIEVED_SUCCESSFUL_MESSAGE } from "../controllers/tags";

export const tagsTest = () =>
  describe("GET /api/projects/tags", () => {
    let accessToken: string;

    beforeAll(async () => {
      await Tag.bulkCreate([
        {
          id: 1,
          name: "2D",
        },
        {
          id: 2,
          name: "3D",
        },
        {
          id: 3,
          name: "Metroidvania",
        },
      ]);
    });

    afterAll(async () => {
      await Tag.destroy({ where: {} });
    });

    it("Should return all created tags", async () => {
      const response = await request(app)
        .get("/api/projects/tags")
        .set("Cookie", global.accessToken);

      const bodyResponse: ApiResponse<any> = response.body;

      expect(response.status).toEqual(STATUS_CODE_OK);
      expect(bodyResponse.status_code).toEqual(STATUS_CODE_OK);
      expect(bodyResponse.message).toEqual(TAGS_RETRIEVED_SUCCESSFUL_MESSAGE);

      expect(
        bodyResponse.data.map((tag) => {
          return tag.name;
        })
      ).toEqual(["2D", "3D", "Metroidvania"]);
    });
  });
