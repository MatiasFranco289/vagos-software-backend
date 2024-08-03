import { param } from "express-validator";
import { validateResult } from "../middlewares/validateMiddleware";
import { isCsvNumbers } from "../utils";

export const projectGetValidation = [
  param("id")
    .exists()
    .withMessage("id must be provided")
    .custom((value) => {
      if (!isCsvNumbers(value))
        throw new Error("id must be a comma-separated list of numbers");

      return true;
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
