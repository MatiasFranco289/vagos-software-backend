import { param, query } from "express-validator";
import { validateResult } from "../middlewares/validateMiddleware";
import { isCsvNumbers } from "../utils";
import { ORDER_BY } from "../constants";

export const projectGetValidation = [
  param("id")
    .exists()
    .withMessage("id must be provided")
    .custom((value) => {
      if (!isCsvNumbers(value))
        throw new Error("id must be a comma-separated list of numbers");

      return true;
    }),
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
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
