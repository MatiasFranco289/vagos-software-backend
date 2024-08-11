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
} from "../constants";
import Role from "../models/Role";

export const AuthController = {
  login: async (
    req: Request,
    res: Response<ApiResponse<UserAtributes | null>>
  ) => {
    const { username, password }: { username: string; password: string } =
      req.body;

    var response: ApiResponse<UserAtributes | null> = {
      status_code: STATUS_CODE_NOT_FOUND,
      message: "User not found.",
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
          message: "Invalid password.",
        };

        return res.status(response.status_code).json(response);
      }

      const token = jwt.sign(
        user.dataValues,
        process.env.SECRET || "vgs_secret",
        {
          expiresIn: "24h",
        }
      );

      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === PRODUCTION,
      });

      user.set("password", "******");

      response = {
        ...response,
        status_code: STATUS_CODE_OK,
        message: "Login successful.",
        data: [user],
      };

      return res.status(response.status_code).json(response);
    } catch (err) {
      response = {
        ...response,
        status_code: STATUS_CODE_INTERNAL_SERVER_ERROR,
        message: "An unexpected error occurred. Please try again later.",
      };

      console.error(err);

      res.status(response.status_code).json(response);
    }
  },
};
