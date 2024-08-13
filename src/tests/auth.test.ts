import request from "supertest";
import app from "../../src/index";
import User from "../models/User";
import Role from "../models/Role";
import { encryptPassword } from "../utils";
import {
  STATUS_CODE_NOT_FOUND,
  STATUS_CODE_OK,
  STATUS_CODE_UNAUTHORIZED,
} from "../constants";
import { ApiResponse } from "../interfaces";
import {
  INVALID_PASSWORD_MESSAGE,
  SECRET_PASSWORD,
  SUCCESSFUL_LOGIN_MESSAGE,
  SUCCESSFUL_LOGOUT_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
} from "../controllers/auth";
import UserStatus from "../models/UserStatus";

describe("POST /api/auth/login", () => {
  let adminRole: Role;
  let activeStatus: UserStatus;
  let encryptedUserPassword: string;
  let user: User;

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
  });

  it("Should login successfully", async () => {
    const response = await request(app).post("/api/auth/login").send({
      username: "test",
      password: "test",
    });

    const body: ApiResponse<any> = response.body;

    expect(response.status).toBe(STATUS_CODE_OK);
    expect(body.status_code).toBe(STATUS_CODE_OK);
    expect(body.message).toBe(SUCCESSFUL_LOGIN_MESSAGE);

    expect(body.data.length).toEqual(1);

    expect(body.data[0]).toHaveProperty("username");
    expect(body.data[0].username).toEqual("test");

    expect(body.data[0]).toHaveProperty("password");
    expect(body.data[0].password).toEqual(SECRET_PASSWORD);

    expect(body.data[0]).toHaveProperty("role_id");
    expect(body.data[0].role_id).toEqual(1);

    expect(response.header).toHaveProperty("set-cookie");
  });

  it("Should return a 404 error if user is not valid", async () => {
    const response = await request(app).post("/api/auth/login").send({
      username: "",
      password: "test",
    });

    const body: ApiResponse<any> = response.body;

    expect(response.status).toBe(STATUS_CODE_NOT_FOUND);
    expect(body.status_code).toBe(STATUS_CODE_NOT_FOUND);

    expect(body.message).toBe(USER_NOT_FOUND_MESSAGE);
    expect(body.data).toEqual([]);
  });

  it("Should return a 401 error if password is incorrect", async () => {
    const response = await request(app).post("/api/auth/login").send({
      username: "test",
      password: "wrong",
    });

    const body: ApiResponse<any> = response.body;

    expect(response.status).toBe(STATUS_CODE_UNAUTHORIZED);
    expect(body.status_code).toBe(STATUS_CODE_UNAUTHORIZED);
    expect(body.message).toBe(INVALID_PASSWORD_MESSAGE);
    expect(body.data).toEqual([]);
  });
});

describe("POST api/auth/logout", () => {
  it("Should logout successfully", async () => {
    const response = await request(app).post("/api/auth/logout");
    const body: ApiResponse<null> = response.body;

    expect(response.status).toBe(STATUS_CODE_OK);
    expect(body.status_code).toBe(STATUS_CODE_OK);
    expect(body.message).toBe(SUCCESSFUL_LOGOUT_MESSAGE);

    expect(response.header).toHaveProperty("set-cookie");

    expect(
      response.header["set-cookie"][0].includes("access_token=;")
    ).toBeTruthy();
  });
});
