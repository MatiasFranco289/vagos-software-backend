import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { validateResult } from "../middlewares/validateMiddleware";

export const createResourceValidation = [
  body("url")
    .exists()
    .withMessage("url should be provided.")
    .isString()
    .withMessage("url should be an string.")
    .isURL()
    .withMessage("url should be a valid url."),
  body("type_id")
    .exists()
    .withMessage("type_id should be provided.")
    .isNumeric()
    .withMessage("type_id should be a number."),
  body("project_id")
    .exists()
    .withMessage("project_id should be provided.")
    .isNumeric()
    .withMessage("project_id should be a number."),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
