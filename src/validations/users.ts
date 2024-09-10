import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { validateResult } from "../middlewares/validateMiddleware";

export const createUserValidation = [
  body("username")
    .exists()
    .withMessage("username should be provided.")
    .isString()
    .withMessage("username should be an string.")
    .isLength({ min: 4 })
    .withMessage("username should be at least 4 characters long."),
  body("password")
    .exists()
    .withMessage("password should be provided.")
    .isString()
    .withMessage("password should be an string.")
    .isStrongPassword()
    .withMessage(
      "The password should be at least 8 characters long, at least one lowercase, one uppercase, one number and one symbol."
    ),
  body("email")
    .exists()
    .withMessage("email should be provided.")
    .isEmail()
    .withMessage("email should be a valid email."),
  body("role_id")
    .exists()
    .withMessage("role_id should be provided.")
    .isNumeric()
    .withMessage("role_id should be a number."),
  body("status_id")
    .exists()
    .withMessage("status_id should be provided.")
    .isNumeric()
    .withMessage("status_id should be a number."),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
