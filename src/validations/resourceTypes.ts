import { NextFunction, Request, Response } from "express";
import { body, param } from "express-validator";
import { validateResult } from "../middlewares/validateMiddleware";

export const createResourceTypeValidation = [
  body("name")
    .exists()
    .withMessage("name should be provided.")
    .isString()
    .withMessage("name should be an string."),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export const updateResourceTypeValidation = [
  param("id").isNumeric().withMessage("id should be a number."),
  body("name")
    .exists()
    .withMessage("name should be provided.")
    .isString()
    .withMessage("name should be an string."),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
