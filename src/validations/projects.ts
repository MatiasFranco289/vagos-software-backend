import { body } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { validateResult } from "../middlewares/validateMiddleware";

export const createProjectValidation = [
  body("title")
    .exists()
    .withMessage("title must be provided.")
    .isString()
    .withMessage("title should be an string.")
    .isLength({ min: 3 })
    .withMessage("title must be at least 3 characters long."),

  body("description")
    .exists()
    .withMessage("description must be provided.")
    .isString()
    .withMessage("description should be an string."),

  body("thumbnail_url")
    .exists()
    .withMessage("thumbnail_url must be provided.")
    .isString()
    .withMessage("thumbnail_url should be an string.")
    .isURL()
    .withMessage("thumbnail_url should be a url."),

  body("start_date")
    .exists()
    .withMessage("start_date must be provided.")
    .isDate()
    .withMessage("start_date should be a date."),

  body("end_date")
    .optional()
    .isDate()
    .withMessage("end_date should be a date."),

  body("expected_end_date")
    .optional()
    .isDate()
    .withMessage("expected_end_date should be a date."),

  body("status_id")
    .exists()
    .withMessage("status_id should be provided.")
    .isInt()
    .withMessage("status_id should be an integer."),

  body("repository_url")
    .exists()
    .withMessage("repository_url should be provided.")
    .isString()
    .withMessage("repository_url should be an string.")
    .isURL()
    .withMessage("repository_url should be a valid url."),

  body("tags_id")
    .exists()
    .withMessage("tags_id should be provided.")
    .isArray()
    .withMessage("tags_id should be an array.")
    .custom((arr) => {
      return arr.every(Number.isInteger);
    })
    .withMessage("all elements in tags_id array should be integers."),

  body("resources_id")
    .optional()
    .isArray()
    .withMessage("resources_id should be an array.")
    .custom((arr) => {
      return arr.every(Number.isInteger);
    })
    .withMessage("all elements in resources array should be integers."),

  body("creator_id")
    .exists()
    .withMessage("creator_id should be provided.")
    .isInt()
    .withMessage("creator_id should be an integer."),

  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
