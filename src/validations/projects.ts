import { body, query } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { validateResult } from "../middlewares/validateMiddleware";
import { PROJECTS_ORDER_BY_TYPES } from "../controllers/projects";

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
    .customSanitizer((value) => (value === "" ? null : value))
    .custom((value) => value === null || !isNaN(Date.parse(value)))
    .withMessage("end_date should be a date."),

  body("expected_end_date")
    .optional()
    .customSanitizer((value) => (value === "" ? null : value))
    .custom((value) => value === null || !isNaN(Date.parse(value)))
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

  body("creator_id")
    .exists()
    .withMessage("creator_id should be provided.")
    .isInt()
    .withMessage("creator_id should be an integer."),

  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export const getAllProjectsValidation = [
  query("order_by")
    .optional()
    .isIn(PROJECTS_ORDER_BY_TYPES)
    .withMessage(
      `order_by can only be ${PROJECTS_ORDER_BY_TYPES.map((order_by) => {
        return order_by;
      })}`
    ),
  query("order")
    .optional()
    .isIn(["ASC", "DESC"])
    .withMessage("order can only be 'ASC' or 'DESC'"),
  query("limit")
    .optional()
    .isNumeric()
    .withMessage("limit should be a number."),
  query("offset")
    .optional()
    .isNumeric()
    .withMessage("offset should be a number."),
  query("tags")
    .optional()
    .notEmpty()
    .withMessage("tags should be an string of comma separated tag names."),
  query("search")
    .optional()
    .isLength({ min: 3 })
    .withMessage("search must be at least 3 characters long."),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
