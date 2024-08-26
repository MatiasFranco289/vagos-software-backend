import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import { validateResult } from "../middlewares/validateMiddleware";

export const createBlogValidation = [
  body("title")
    .exists()
    .withMessage("title must be provided.")
    .isString()
    .withMessage("title should be an string.")
    .isLength({ min: 1 })
    .withMessage("title should be at least 1 character long."),
  body("description")
    .exists()
    .withMessage("description should be provided.")
    .isString()
    .withMessage("description should be an string.")
    .isLength({ min: 1 })
    .withMessage("description should be at least 1 character long."),
  body("project_id")
    .exists()
    .withMessage("project_id should be provided.")
    .isNumeric()
    .withMessage("project_id should be a number."),
  body("user_id")
    .exists()
    .withMessage("user_id should be provided.")
    .isNumeric()
    .withMessage("user_id should be a number."),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
