import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "./../interfaces";
import { STATUS_CODE_BAD_REQUEST } from "../constants";

// This function is used for validations
// If the validation succeds it allows to go to next endpoint
// If validation fails it returns a 400 status code response with the validations failed
export const validateResult = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error) {
    const response: ApiResponse<null> = {
      status_code: STATUS_CODE_BAD_REQUEST,
      message: "Bad Request",
      data: error.array(),
    };

    res.status(response.status_code).json(response);
  }
};
