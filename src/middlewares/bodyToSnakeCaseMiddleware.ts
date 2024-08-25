import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../interfaces";

type AnyObject = { [key: string]: any };

// Transform camelCase string to a snake_case string
function camelToSnakeCase(text: string): string {
  return text.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
}

// This function uses recursivity to iterate over all keys of an object
// if the key of the object is also another object it will iterate over the sub-object recursively
// it will return the same object but having all keys transformed to snake_case
function objectKeysToSnakeCase(obj: any): any {
  if (Array.isArray(obj)) {
    // Si el objeto es un array, mapear cada elemento recursivamente
    return obj.map((item) => objectKeysToSnakeCase(item));
  } else if (typeof obj === "object" && obj !== null) {
    // Si el objeto es un objeto regular, iterar sobre sus claves
    const result: any = {};
    Object.keys(obj).forEach((key) => {
      const snakeKey = camelToSnakeCase(key);
      result[snakeKey] = objectKeysToSnakeCase(obj[key]);
    });
    return result;
  } else {
    // Si el objeto no es un array ni un objeto, retornarlo tal cual
    return obj;
  }
}

const bodyKeysToSnakeCase = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const originalSend = res.send;

  // Override the res.send method
  res.send = function (body: string) {
    // The response will be always a json so i transform it to be an object follwoing the interface ApiResponse
    const bodyObject: ApiResponse<any> = JSON.parse(body);

    // Iterate over every element of the array data in the response
    // and tranform all its keys to snake_case
    let snakeCaseData = [];

    bodyObject.data.map((element) => {
      snakeCaseData.push(objectKeysToSnakeCase(element));
    });

    // Overwrites the old data object in body for the new object having snake_case keys
    bodyObject.data = snakeCaseData;

    body = JSON.stringify(bodyObject);

    // Call the original res.send method with the body
    return originalSend.call(this, body);
  };

  // Pass control to the next middleware or route handler
  next();
};

export default bodyKeysToSnakeCase;
