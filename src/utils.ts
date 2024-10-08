import bcrypt from "bcrypt";
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  SALT_ROUNDS,
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_INTERNAL_SERVER_ERROR,
} from "./constants";
import { ValidationError } from "sequelize";
import { ApiResponse } from "./interfaces";
import { ForeignKeyConstraintError } from "sequelize";
import { Request } from "express";
import logger from "./config/logger";

// This function receives an string and returns the same string hashed
export const encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// This function compares a default string and a hashed string and determines if are equal or not
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// This function handle errors in endpoints
// If the error is a ValidationError and it is included in managedValidationErrors it will return a custom response
// otherwise it will return a default 500 error response
export function handleApiError(error: unknown, customLogMessage?: string) {
  const defaultLogMessage = "The following error has ocurred: ";
  const response: ApiResponse<null> = {
    status_code: STATUS_CODE_INTERNAL_SERVER_ERROR,
    message: INTERNAL_SERVER_ERROR_MESSAGE,
    data: [],
  };

  const managedDateValidationErrors = ["unique violation"];
  const managedRestrictionsValidations = ["SequelizeForeignKeyConstraintError"];

  // If a date validation of sequelize was violated
  if (error instanceof ValidationError) {
    const errorsList = error.errors;

    for (let i = 0; i < errorsList.length; i++) {
      const err = errorsList[i];

      if (managedDateValidationErrors.includes(err.type)) {
        response.status_code = STATUS_CODE_BAD_REQUEST;
        response.message = err.message;
        break;
      }
    }
  }

  // If a restriction of sequelize is violated
  if (error instanceof ForeignKeyConstraintError) {
    const errName: string = error.name;

    if (managedRestrictionsValidations.includes(errName)) {
      response.status_code = STATUS_CODE_BAD_REQUEST;
      response.message = error.message;
    }
  }

  console.error(`${customLogMessage || defaultLogMessage}`);
  console.error(error);

  return response;
}
