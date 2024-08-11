import { ApiResponse, UserAtributes } from "../interfaces";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { comparePassword } from "../utils";
import {
  PRODUCTION,
  STATUS_CODE_INTERNAL_SERVER_ERROR,
  STATUS_CODE_NOT_FOUND,
  STATUS_CODE_OK,
  STATUS_CODE_UNAUTHORIZED,
  DEFAULT_SECRET,
  INTERNAL_SERVER_ERROR_MESSAGE,
} from "../constants";
import Role from "../models/Role";

export const INVALID_PASSWORD_MESSAGE = "Invalid password.";
export const SUCCESSFUL_LOGIN_MESSAGE = "Login successful.";
export const USER_NOT_FOUND_MESSAGE = "User not found.";
export const SUCCESSFUL_LOGOUT_MESSAGE = "Logout successful.";
export const TOKEN_DURATION = "24h";
export const SECRET_PASSWORD = "******";
export const TOKEN_NAME = "access_token";

export const AuthController = {
  login: async (
    req: Request,
    res: Response<ApiResponse<UserAtributes | null>>
  ) => {
    const { username, password }: { username: string; password: string } =
      req.body;

    var response: ApiResponse<UserAtributes | null> = {
      status_code: STATUS_CODE_NOT_FOUND,
      message: USER_NOT_FOUND_MESSAGE,
      data: [],
    };

    try {
      const user = await User.findOne({
        where: { username },
        include: { model: Role, as: "role" },
      });

      if (!user) {
        return res.status(response.status_code).json(response);
      }

      const isPasswordValid = await comparePassword(
        password,
        user.dataValues.password
      );

      if (!isPasswordValid) {
        response = {
          ...response,
          status_code: STATUS_CODE_UNAUTHORIZED,
          message: INVALID_PASSWORD_MESSAGE,
        };

        return res.status(response.status_code).json(response);
      }

      const token = jwt.sign(
        user.dataValues,
        process.env.SECRET || DEFAULT_SECRET,
        {
          expiresIn: TOKEN_DURATION,
        }
      );

      res.cookie(TOKEN_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === PRODUCTION,
      });

      user.set("password", SECRET_PASSWORD);

      response = {
        ...response,
        status_code: STATUS_CODE_OK,
        message: SUCCESSFUL_LOGIN_MESSAGE,
        data: [user],
      };

      return res.status(response.status_code).json(response);
    } catch (err) {
      response = {
        ...response,
        status_code: STATUS_CODE_INTERNAL_SERVER_ERROR,
        message: INTERNAL_SERVER_ERROR_MESSAGE,
      };

      console.error(err);

      res.status(response.status_code).json(response);
    }
  },
  logout: (_req: Request, res: Response<ApiResponse<null>>) => {
    let response: ApiResponse<null> = {
      status_code: STATUS_CODE_OK,
      message: SUCCESSFUL_LOGOUT_MESSAGE,
      data: [],
    };

    try {
      res.clearCookie(TOKEN_NAME);
    } catch (err) {
      response.status_code = STATUS_CODE_INTERNAL_SERVER_ERROR;
      response.message = INTERNAL_SERVER_ERROR_MESSAGE;

      console.error(err);
    }

    res.status(response.status_code).json(response);
  },
};
