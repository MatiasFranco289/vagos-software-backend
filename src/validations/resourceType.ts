import { body, param } from "express-validator";
import { validateResult } from "../middlewares/validateMiddleware";
import {
  hasUnwantedKeys,
  isCsvNumbers,
  isStringOrArrayOfStrings,
} from "../utils";

const allowedKeys = ["is_active", "new_resource_type_name"];

export const resourceTypeCreateValidation = [
  body("resource_type_name")
    .exists()
    .withMessage("resource_type_name must be provided")
    .custom((value) => {
      return isStringOrArrayOfStrings(value, "resource_type_name");
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const resourceTypeUpdateValidation = [
  param("id")
    .exists()
    .withMessage("id must be provided")
    .isNumeric()
    .withMessage("id must be a number"),
  body("new_resource_type_name")
    .optional()
    .isString()
    .withMessage("new_resource_type_name must be a string"),
  (req, res, next) => {
    hasUnwantedKeys(allowedKeys, req.body);
    validateResult(req, res, next);
  },
];

export const resourceTypeGetValidation = [
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
