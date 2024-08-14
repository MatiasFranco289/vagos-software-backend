import { STATUS_CODE_BAD_REQUEST } from "../constants";
import app from "../index";
import { ApiResponse } from "../interfaces";
import Role from "../models/Role";
import User from "../models/User";
import UserStatus from "../models/UserStatus";
import { encryptPassword } from "../utils";
import request from "supertest";
import { CREATOR_NOT_FOUND_MESSAGE } from "../controllers/projects";

describe("POST /api/admin/project", () => {
  let adminRole: Role;
  let activeStatus: UserStatus;
  let encryptedUserPassword: string;
  let creator: User;
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

    creator = await User.create({
      id: 1,
      username: "test",
      email: "test@gmail.com",
      password: encryptedUserPassword,
      roleId: adminRole.id,
      statusId: activeStatus.id,
    });

    // I need to authenticate to get access_token before call others endpoints
    const authResponse = await request(app).post("/api/auth/login").send({
      username: "test",
      password: "test",
    });

    const cookies = authResponse.headers["set-cookie"];
    accessToken = cookies[0].split(";")[0];
  });
  it("Should return an error if non-existent user id are passed", async () => {
    const response = await request(app)
      .post("/api/admin/projects")
      .set("Cookie", accessToken)
      .send({
        title: "test project",
        description: "test description",
        thumbnail_url: "www.google.com",
        start_date: "2024-08-13",
        status_id: 1,
        repository_url: "www.github.com",
        tags_id: [1, 2],
        creator_id: 2,
      });

    const body: ApiResponse<any> = response.body;

    expect(response.status).toEqual(STATUS_CODE_BAD_REQUEST);
    expect(body.status_code).toEqual(STATUS_CODE_BAD_REQUEST);
    expect(body.message).toEqual(CREATOR_NOT_FOUND_MESSAGE);
  });
});
