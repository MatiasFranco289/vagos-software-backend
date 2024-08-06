import { body, param, query } from "express-validator";
import { validateResult } from "../middlewares/validateMiddleware";
import { isCsvNumbers, isEmail } from "../utils";
import { ORDER_BY } from "../constants";

export const userCreateValidation = [
  body("role_id")
    .exists()
    .withMessage("role_id must be provided")
    .isNumeric()
    .withMessage("role_id must be a number"),
  body("state_id")
    .exists()
    .withMessage("state_id must be provided")
    .isNumeric()
    .withMessage("state_id must be a number"),
  body("username")
    .exists()
    .withMessage("username must be provided")
    .isString()
    .withMessage("username must be a string"),
  body("email")
    .exists()
    .withMessage("email must be provided")
    .isString()
    .withMessage("email must be a string")
    .custom((value) => {
      return isEmail(value);
    })
    .withMessage("email must be a valid mail address"),
  body("password").exists().withMessage("password must be provided"),
  body("profile_picture")
    .optional()
    .isString()
    .withMessage("profile_picture must be a string"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const userUpdateValidation = [
  param("id")
    .exists()
    .withMessage("id must be provided")
    .isNumeric()
    .withMessage("id must be a number"),
  body("role_id")
    .optional()
    .isNumeric()
    .withMessage("role_id must be a number"),
  body("state_id")
    .optional()
    .isNumeric()
    .withMessage("state_id must be a number"),
  body("username")
    .optional()
    .isString()
    .withMessage("username must be a string"),
  body("email")
    .optional()
    .isString()
    .withMessage("email must be a number")
    .custom((value) => {
      return isEmail(value);
    })
    .withMessage("email must be a valid email"),
  body("password").optional(),
  body("profile_picture")
    .optional()
    .isString()
    .withMessage("profile_picture must be a string"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

export const userDeleteValidation = [
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

export const userGetValidation = userDeleteValidation;

export const userGetAllValidation = [
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
