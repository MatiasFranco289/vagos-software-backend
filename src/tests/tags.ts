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
  describe("GET /api/tags/all", () => {
    let adminRole: Role;
    let activeStatus: UserStatus;
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

      const encryptedUserPassword = await encryptPassword("test");

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

    it("Should return all created tags", async () => {
      const response = await request(app)
        .get("/api/tags/all")
        .set("Cookie", accessToken);

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
