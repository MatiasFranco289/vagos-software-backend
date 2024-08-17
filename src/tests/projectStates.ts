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
    let adminRole: Role;
    let activeStatus: UserStatus;
    let encryptedUserPassword: string;
    let user: User;
    let accessToken: string;

    beforeAll(async () => {
      adminRole = await Role.create({
        id: 1,
        name: "ADMIN",
      });

      activeStatus = await UserStatus.create({
        id: 1,
        name: "ACTIVE",
      });

      encryptedUserPassword = await encryptPassword("test");

      user = await User.create({
        id: 1,
        username: "test",
        email: "test@gmail.com",
        password: encryptedUserPassword,
        roleId: adminRole.id,
        statusId: activeStatus.id,
      });

      const authResponse = await request(app).post("/api/auth/login").send({
        username: "test",
        password: "test",
      });

      const cookies = authResponse.headers["set-cookie"];
      accessToken = cookies[0].split(";")[0];

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
      await User.destroy({ where: {} });
      await Role.destroy({ where: {} });
      await UserStatus.destroy({ where: {} });
      await ProjectStatus.destroy({ where: {} });
    });

    it("Should return all created project status", async () => {
      const response = await request(app)
        .get("/api/projects/status")
        .set("Cookie", accessToken);
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
