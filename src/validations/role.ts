import { body, param } from "express-validator";
import { validateResult } from "../middlewares/validateMiddleware";

export const roleCreateValidation = [
  body("role_name")
    .exists()
    .custom((value) => {
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
        "role_name must be a non-empty string or an array of non-empty strings"
      );
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const roleUpdateValidation = [
  param("id")
    .exists()
    .withMessage("id must be provided")
    .isNumeric()
    .withMessage("id must be a number"),
  body("new_role_name")
    .exists()
    .withMessage("new_role_name must be provided")
    .isString()
    .withMessage("new_role_name must be a string"),
  (req, res, next) => {
    //Note: maybe add some code here so that the error message is easier to read
    validateResult(req, res, next);
  },
];

export const roleDeleteValidation = [
  param("id")
    .exists()
    .withMessage("id must be provided")
    .custom((value) => {
      // Check if the value is a comma-separated list of numbers
      const regex = /^(\d+)(,\d+)*$/;
      if (!regex.test(value)) {
        throw new Error("id must be a comma-separated list of numbers");
      }
      return true;
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const roleGetValidation = roleDeleteValidation;
