import Role from "../models/Role";
import User from "../models/User";
import UserStatus from "../models/UserStatus";
import { encryptPassword } from "../utils";
import request from "supertest";
import app from "../../src/index";
import { ApiResponse } from "../interfaces";
import { STATUS_CODE_OK } from "../constants";
import ProjectStatus from "../models/ProjectStatus";

export const projectStatesTest = () =>
  describe("GET /api/projects/status", () => {
    let accessToken: string;

    beforeAll(async () => {
      await ProjectStatus.bulkCreate([
        {
          id: 1,
          name: "ACTIVE",
        },
        {
          id: 2,
          name: "FINISHED",
        },
        {
          id: 3,
          name: "PAUSED",
        },
      ]);
    });

    afterAll(async () => {
      await ProjectStatus.destroy({ where: {} });
    });

    it("Should return all created project status", async () => {
      const response = await request(app)
        .get("/api/projects/status")
        .set("Cookie", global.accessToken);
      const bodyResponse: ApiResponse<any> = response.body;

      expect(response.status).toEqual(STATUS_CODE_OK);
      expect(bodyResponse.status_code).toEqual(STATUS_CODE_OK);

      expect(
        bodyResponse.data.map((status) => {
          return status.name;
        })
      ).toEqual(["ACTIVE", "FINISHED", "PAUSED"]);
    });
  });
