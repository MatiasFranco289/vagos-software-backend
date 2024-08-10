import { ApiResponse } from "../interfaces";
import { Request, Response } from "express";

interface MockedRoles {
  id: number;
  rolename: "USER" | "ADMIN";
}

interface MockedUser {
  id: number;
  username: string;
  roles: Array<MockedRoles>;
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
          roles: [
            {
              id: 1,
              rolename: "ADMIN",
            },
          ],
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
};
