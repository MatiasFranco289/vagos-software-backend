import { body, param, query } from "express-validator";
import { validateResult } from "../middlewares/validateMiddleware";
import { hasUnwantedKeys, isCsvNumbers } from "../utils";
import { ORDER_BY } from "../constants";

//When there's an update, only a json with these keys will be accepted
const allowedKeys: Array<string> = [
  "state_id",
  "creator_id",
  "project_name",
  "project_image",
  "project_content",
  "project_start_date",
  "project_end_date",
  "isActive",
];

export const projectCreateValidation = [
  body("state_id")
    .exists()
    .withMessage("state_id must be provided")
    .isNumeric()
    .withMessage("state_id must be a number"),
  body("creator_id")
    .exists()
    .withMessage("creator_id must be provided")
    .isNumeric()
    .withMessage("creator_id must be a number"),
  body("project_name")
    .exists()
    .withMessage("name must be provided")
    .isString()
    .withMessage("name must be a string"),
  body("project_image")
    .optional()
    .isString()
    .withMessage("image must be a string"),
  body("project_content")
    .exists()
    .withMessage("content must be provided")
    .isString()
    .withMessage("content must be a string"),
  body("project_start_date")
    .optional()
    .isDate()
    .withMessage("project_start_date must be a string"),
  body("project_start_end")
    .optional()
    .isDate()
    .withMessage("project_start_end must be a string"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const projectUpdateValidation = [
  param("id").exists().isNumeric().withMessage("id must be a number"),
  body("state_id")
    .optional()
    .isNumeric()
    .withMessage("state_id must be a number"),
  body("creator_id")
    .optional()
    .isNumeric()
    .withMessage("creator_id must be a number"),
  body("project_name")
    .optional()
    .isString()
    .withMessage("name must be a string"),
  body("project_image")
    .optional()
    .isString()
    .withMessage("image must be a string"),
  body("project_content")
    .optional()
    .isString()
    .withMessage("content must be a string"),
  (req, res, next) => {
    hasUnwantedKeys(allowedKeys, req.body);
    validateResult(req, res, next);
  },
];

export const projectGetValidation = [
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

export const projectGetAllValidation = [
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
  query("role_id")
    .optional()
    .isNumeric()
    .withMessage("role_id must be a number"),
  query("state_id")
    .optional()
    .isNumeric()
    .withMessage("state_id must be a number"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
