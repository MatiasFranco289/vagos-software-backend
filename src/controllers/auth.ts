import { ApiResponse } from "../interfaces";
import { Request, Response } from "express";

interface MockedRole {
  id: number;
  rolename: "USER" | "ADMIN";
}

interface MockedUser {
  id: number;
  username: string;
  role: MockedRole;
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
const COOKIE_MAX_AGE = parseInt(process.env.COOKIE_MAX_AGE!) || 1000 * 60 * 60;

export const AuthController = {
  login: async (req: Request, res: Response<ApiResponse<MockedUser>>) => {
    const statusCode: number = 200;

    const response: ApiResponse<MockedUser> = {
      status_code: statusCode,
      message: "Successful login",
      data: [
        {
          id: 1,
          username: "VagoDev1",
          role: {
            id: 1,
            rolename: "ADMIN",
          },
        },
      ],
    };

    res.cookie("access_token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: COOKIE_MAX_AGE,
    });

    res.status(statusCode).json(response);
  },
  loginFailed: async (req: Request, res: Response<ApiResponse<null>>) => {
    const statusCode: number = 403;

    const response: ApiResponse<null> = {
      status_code: statusCode,
      message: "Incorrect credentials",
      data: [],
    };

    res.status(statusCode).json(response);
  },
  // This endpoint will not be really related to login because for login endpoint authentication token
  // is not needed. Instead this endpoint emulates the middleware behavior which will allow us to access
  // another endpoints or reject us if our token is invalid
  loginInvalidToken: async (req: Request, res: Response<ApiResponse<null>>) => {
    const statusCode: number = 403;

    const response: ApiResponse<null> = {
      status_code: statusCode,
      message: "Invalid token",
      data: [],
    };

    res.status(statusCode).json(response);
  },
};
