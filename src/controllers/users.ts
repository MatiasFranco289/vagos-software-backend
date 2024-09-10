import { Request, Response } from "express";
import { ApiResponse } from "../interfaces";
import User from "../models/User";
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_CREATED,
  STATUS_CODE_INTERNAL_SERVER_ERROR,
} from "../constants";
import { encryptPassword, handleApiError } from "../utils";
import UserStatus from "../models/UserStatus";
import Role from "../models/Role";
import { SECRET_PASSWORD } from "./auth";

export const DEFAULT_ERROR_MESSAGE =
  "The following error has ocurred while trying to create the user:";
export const SUCCESS_USER_CREATION_MESSAGE =
  "User has been created successfully.";
export const INVALID_STATUS_ID_MESSAGE =
  "The provided user_status does not corresponding to an existing user status.";
export const INVALID_ROLE_ID_MESSAGE =
  "The provided role_id is does not corresponding to an existing user role.";

export const usersController = {
  createUser: async (req: Request, res: Response<ApiResponse<null | User>>) => {
    const { username, email, password, role_id, status_id } = req.body;

    let response: ApiResponse<null | User> = {
      status_code: STATUS_CODE_INTERNAL_SERVER_ERROR,
      message: INTERNAL_SERVER_ERROR_MESSAGE,
      data: [],
    };

    try {
      const status = await UserStatus.findByPk(status_id);

      if (!status) {
        response.status_code = STATUS_CODE_BAD_REQUEST;
        response.message = INVALID_STATUS_ID_MESSAGE;

        return res.status(response.status_code).json(response);
      }
    } catch (err) {
      return res.status(response.status_code).json(response);
    }

    try {
      const role = await Role.findByPk(role_id);

      if (!role) {
        response.status_code = STATUS_CODE_BAD_REQUEST;
        response.message = INVALID_ROLE_ID_MESSAGE;

        return res.status(response.status_code).json(response);
      }
    } catch (err) {
      return res.status(response.status_code).json(response);
    }

    try {
      const newUser = await User.create({
        username: username,
        email: email,
        password: await encryptPassword(password),
        roleId: role_id,
        statusId: status_id,
      });

      newUser.set("password", SECRET_PASSWORD);

      response = {
        status_code: STATUS_CODE_CREATED,
        message: SUCCESS_USER_CREATION_MESSAGE,
        data: [newUser],
      };
    } catch (err) {
      response = handleApiError(err, DEFAULT_ERROR_MESSAGE);
    }

    return res.status(response.status_code).json(response);
  },
};
