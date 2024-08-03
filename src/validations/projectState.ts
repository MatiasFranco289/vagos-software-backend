import { body, param } from "express-validator";
import { validateResult } from "./../middlewares/validateMiddleware";
import { isStringOrArrayOfStrings, isCsvNumbers } from "../utils";

export const projectStateCreateValidation = [
  body("project_state_name")
    .exists()
    .withMessage("project_state_name must be provided")
    .custom((value) => {
      return isStringOrArrayOfStrings(value, "project_state_name");
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const projectStateUpdateValidation = [
  param("id")
    .exists()
    .withMessage("id must be provided")
    .isNumeric()
    .withMessage("id must be a number"),
  body("new_project_state_name")
    .exists()
    .withMessage("new_project_state_name must be provided")
    .isString()
    .withMessage("new_project_state_name must be a string"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const projectStateDeleteValidation = [
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

export const projectStateGetValidation = projectStateDeleteValidation;
