import { body, param, query } from "express-validator";
import { validateResult } from "../middlewares/validateMiddleware";
import { hasUnwantedKeys, isCsvNumbers } from "../utils";
import { ORDER_BY } from "../constants";

const allowedKeys = ["project_id", "creator_id", "blog_title", "blog_content"];

export const blogCreateValidation = [
  body("project_id")
    .exists()
    .withMessage("project_id must be provided")
    .isNumeric()
    .withMessage("project_id must be a number"),
  body("creator_id")
    .exists()
    .withMessage("creator_id must be provided")
    .isNumeric()
    .withMessage("creator_id must be a number"),
  body("blog_title")
    .exists()
    .withMessage("blog_title must be provided")
    .isString()
    .withMessage("blog_title must be a string"),
  body("blog_content")
    .exists()
    .withMessage("blog_content must be provided")
    .isString()
    .withMessage("blog_content must be a string"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const blogUpdateValidation = [
  param("id")
    .exists()
    .withMessage("id must be provided")
    .isNumeric()
    .withMessage("id must be a number"),
  body("project_id")
    .optional()
    .isNumeric()
    .withMessage("project_id must be a number"),
  body("creator_id")
    .optional()
    .isNumeric()
    .withMessage("creator_id must be a number"),
  body("blog_title")
    .optional()
    .isString()
    .withMessage("blog_title must be a string"),
  body("blog_content")
    .optional()
    .isString()
    .withMessage("blog_content must be a string"),
  (req, res, next) => {
    hasUnwantedKeys(allowedKeys, req.body);
    validateResult(req, res, next);
  },
];

export const blogGetValidation = [
  param("id")
    .exists()
    .withMessage("id must be provided")
    .custom((value) => {
      // Check if the value is a comma-separated list of numbers
      return isCsvNumbers(value);
    })
    .withMessage("id must be a comma-separated list of numbers"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const blogGetAllValidation = [
  query("order_by")
    .optional()
    .isString()
    .withMessage("order_by must be a string")
    .custom((value) => {
      //Check if value is a valid way to order the requested elements
      return ORDER_BY.indexOf(value) > -1 ? true : false;
    })
    .withMessage(
      "order_by must have one of the following values: " + ORDER_BY.toString()
    ),
  query("limit")
    .optional()
    .custom((value) => {
      return parseInt(value) > 0;
    })
    .withMessage("limit must be a number greater than 0"),
  query("offset")
    .optional()
    .custom((value) => {
      console.log(typeof value);
      return parseInt(value) >= 0;
    })
    .withMessage("offset must be a number greater than or equal to 0"),
  query("project_id")
    .optional()
    .isNumeric()
    .withMessage("project_id must be a number"),
  query("creator_id")
    .optional()
    .isNumeric()
    .withMessage("creator_id must be a number"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
