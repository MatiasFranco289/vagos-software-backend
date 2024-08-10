import { body, param, query } from "express-validator";
import { validateResult } from "../middlewares/validateMiddleware";
import { hasUnwantedKeys, isCsvNumbers } from "../utils";
import { ORDER_BY } from "../constants";

const allowedKeys = ["new_resource_type_id", "new_resource_url"];

export const resourceCreateValidation = [
  body("resource_type_id")
    .exists()
    .withMessage("resource_type_id must be provided")
    .isNumeric()
    .withMessage("resource_type_id must be a number"),
  body("resource_url")
    .exists()
    .withMessage("resource_url must be provided")
    .isString()
    .withMessage("resource_url must be a string"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const resourceUpdateValidation = [
  param("id")
    .exists()
    .withMessage("id must be provided")
    .isNumeric()
    .withMessage("id must be a number"),
  body("new_resource_type_id")
    .optional()
    .isNumeric()
    .withMessage("new_resource_type_id must be a number"),
  body("new_resource_url")
    .optional()
    .isString()
    .withMessage("new_resource_url must be a string"),
  (req, res, next) => {
    hasUnwantedKeys(allowedKeys, req.body);
    validateResult(req, res, next);
  },
];
export const resourceDeleteValidation = [
  param("id")
    .exists()
    .withMessage("id must be provided")
    .custom((value) => {
      // Check if the value is a comma-separated list of numbers
      if (!isCsvNumbers(value)) {
        throw new Error("id must be a comma-separated list of numbers");
      }
      return true;
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
export const resourceGetValidation = resourceDeleteValidation;

export const resourceGetAllValidation = [
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
  query("resource_type_id")
    .optional()
    .isNumeric()
    .withMessage("resource_type_id must be a number"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
