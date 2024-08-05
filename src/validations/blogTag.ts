import { body, param } from "express-validator";
import { validateResult } from "../middlewares/validateMiddleware";
import { isCsvNumbers, isStringOrArrayOfStrings } from "../utils";

export const blogTagCreateValidation = [
  body("blog_tag_name")
    .exists()
    .withMessage("blog_tag_name must be provided")
    .custom((value) => {
      return isStringOrArrayOfStrings(value, "blog_tag_name");
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const blogTagUpdateValidation = [
  param("id")
    .exists()
    .withMessage("id must be provided")
    .isNumeric()
    .withMessage("id must be a number"),
  body("new_blog_tag_name")
    .exists()
    .withMessage("new_blog_tag_name must be provided")
    .isString()
    .withMessage("new_blog_tag_name must be a string"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const blogTagDeleteValidation = [
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

export const blogTagGetValidation = blogTagDeleteValidation;
