import { body } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { validateResult } from "../middlewares/validateMiddleware";

export const authValidation = [
  body("username")
    .exists()
    .withMessage("username must be provided.")
    .isString()
    .withMessage("username should be a string."),
  body("password")
    .exists()
    .withMessage("password must be provided.")
    .isString()
    .withMessage("password should be a string."),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
