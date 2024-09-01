import { Request, Response, NextFunction } from "express";
import { TOKEN_NAME } from "../controllers/auth";
import {
  DEFAULT_SECRET,
  STATUS_CODE_FORBIDDEN,
  STATUS_CODE_UNAUTHORIZED,
} from "../constants";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../interfaces";

const INVALID_TOKEN_MESSAGE = "Invalid token.";
const FORBIDDEN_MESSAGE = "Insuficient permissions.";

export const validateToken = (allowedRoles: Array<string>) => {
  return function validateToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let response: ApiResponse<null> = {
      status_code: STATUS_CODE_UNAUTHORIZED,
      message: INVALID_TOKEN_MESSAGE,
      data: [],
    };

    const tokenWithPrefix = req.headers.cookie;

    try {
      // Remove prefix
      const tokenAndPrefix = tokenWithPrefix.split("=");
      const prefix = tokenAndPrefix[0];
      const tokenWithoutPrefix = tokenAndPrefix[1];

      // If prefix is not the correct
      if (prefix !== TOKEN_NAME) {
        return res.status(response.status_code).json(response);
      }

      // Attemps to decrypt the token
      const secret = process.env.SECRET || DEFAULT_SECRET;
      const decoded = jwt.verify(tokenWithoutPrefix, secret);

      if (typeof decoded !== "object") {
        return res.status(response.status_code).json(response);
      }

      if (allowedRoles.includes(decoded.role.name)) {
        next();
      }
      // If client has no required role
      else {
        response.status_code = STATUS_CODE_FORBIDDEN;
        response.message = FORBIDDEN_MESSAGE;

        return res.status(response.status_code).json(response);
      }
    } catch (err) {
      res.status(response.status_code).json(response);
    }
  };
};
