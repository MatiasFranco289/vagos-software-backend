import { body, param } from "express-validator";
import { validateResult } from "../middlewares/validateMiddleware";
import { isCsvNumbers } from "../utils";

export const projectTagCreateValidation = [
  body("project_tag_name")
    .exists()
    .withMessage("project_tag_name must be provided")
    .custom((value) => {
      //TODO: Change this into a function
      if (typeof value === "string" && value.trim() !== "") {
        return true;
      }
      if (
        Array.isArray(value) &&
        value.every((item) => typeof item === "string" && item.trim() !== "")
      ) {
        return true;
      }
      throw new Error(
        "project_tag_name must be a non-empty string or an array of non-empty strings"
      );
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const projectTagUpdateValidation = [
  param("id")
    .exists()
    .withMessage("id must be provided")
    .isNumeric()
    .withMessage("id must be a number"),
  body("new_project_tag_name")
    .exists()
    .withMessage("new_project_tag_name must be provided")
    .isString()
    .withMessage("new_project_tag_name must be a string"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const projectTagDeleteValidation = [
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

export const projectTagGetValidation = [];
