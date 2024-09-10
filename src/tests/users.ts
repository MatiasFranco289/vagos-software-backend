import request from "supertest";
import app from "..";
import Role from "../models/Role";
import UserStatus from "../models/UserStatus";
import { ApiResponse } from "../interfaces";
import { STATUS_CODE_BAD_REQUEST, STATUS_CODE_CREATED } from "../constants";
import {
  INVALID_ROLE_ID_MESSAGE,
  INVALID_STATUS_ID_MESSAGE,
  SUCCESS_USER_CREATION_MESSAGE,
} from "../controllers/users";
import User from "../models/User";

export const createUserTest = () => {
  beforeAll(async () => {
    await Role.create({
      name: "TEST",
    });

    await UserStatus.create({
      name: "TEST",
    });
  });

  afterAll(async () => {
    await Role.destroy({
      where: {
        name: "TEST",
      },
    });

    await UserStatus.destroy({
      where: {
        name: "TEST",
      },
    });
  });

  describe("POST /api/auth/login", () => {
    it("Should return a 400 error if an invalid role_id is passed", async () => {
      const response = await request(app)
        .post("/api/users")
        .set("Cookie", global.accessToken)
        .send({
          username: "VagoDevTesting",
          password: "TestPassword1!",
          email: "testemail@gmail.com",
          role_id: 10,
          status_id: 1,
        });

      const bodyResponse: ApiResponse<any> = response.body;

      expect(response.status).toBe(STATUS_CODE_BAD_REQUEST);
      expect(bodyResponse.status_code).toBe(STATUS_CODE_BAD_REQUEST);
      expect(bodyResponse.message).toBe(INVALID_ROLE_ID_MESSAGE);
    });

    it("Should return a 400 error if an invalid status_id is passed", async () => {
      const response = await request(app)
        .post("/api/users")
        .set("Cookie", global.accessToken)
        .send({
          username: "VagoDevTesting",
          password: "TestPassword1!",
          email: "testemail@gmail.com",
          role_id: 1,
          status_id: 10,
        });

      const bodyResponse: ApiResponse<any> = response.body;

      expect(response.status).toBe(STATUS_CODE_BAD_REQUEST);
      expect(bodyResponse.status_code).toBe(STATUS_CODE_BAD_REQUEST);
      expect(bodyResponse.message).toBe(INVALID_STATUS_ID_MESSAGE);
    });

    it("Should return a 400 error if username is not unique", async () => {
      const response = await request(app)
        .post("/api/users")
        .set("Cookie", global.accessToken)
        .send({
          username: "test",
          password: "TestPassword1!",
          email: "testemail@gmail.com",
          role_id: 1,
          status_id: 1,
        });

      const bodyResponse: ApiResponse<any> = response.body;

      expect(response.status).toBe(STATUS_CODE_BAD_REQUEST);
      expect(bodyResponse.status_code).toBe(STATUS_CODE_BAD_REQUEST);
      expect(bodyResponse.message).toBe("username must be unique");
    });

    it("Should return a 400 error if email is not unique", async () => {
      const response = await request(app)
        .post("/api/users")
        .set("Cookie", global.accessToken)
        .send({
          username: "VagoDevTesting",
          password: "TestPassword1!",
          email: "test@gmail.com",
          role_id: 1,
          status_id: 1,
        });

      const bodyResponse: ApiResponse<any> = response.body;

      expect(response.status).toBe(STATUS_CODE_BAD_REQUEST);
      expect(bodyResponse.status_code).toBe(STATUS_CODE_BAD_REQUEST);
      expect(bodyResponse.message).toBe("email must be unique");
    });

    it("Should create an user successfully if everything is ok", async () => {
      const response = await request(app)
        .post("/api/users")
        .set("Cookie", global.accessToken)
        .send({
          username: "VagoDevTesting",
          password: "TestPassword1!",
          email: "testemail@gmail.com",
          role_id: 1,
          status_id: 1,
        });

      const bodyResponse: ApiResponse<any> = response.body;

      expect(response.status).toBe(STATUS_CODE_CREATED);
      expect(bodyResponse.status_code).toBe(STATUS_CODE_CREATED);
      expect(bodyResponse.message).toBe(SUCCESS_USER_CREATION_MESSAGE);
    });

    it("Password should be encrypted", async () => {
      const user = await User.findAll({
        where: {
          username: "VagoDevTesting",
        },
      });

      expect(user[0].password).not.toBe("TestPassword1");
    });
  });
};
