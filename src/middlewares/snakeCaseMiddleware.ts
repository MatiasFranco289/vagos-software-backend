import { Response, Request, NextFunction } from "express";
import { ApiResponse } from "../interfaces";

// This middleware transforms all keys in response to snake_case
export async function transformKeysToSnakeCase(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  const { snakeCase } = await import("change-case");
  const originalJson = res.json;

  res.json = (body: any) => {
    const transformObject = (obj: ApiResponse<any>): any => {
      obj.data.map((data) => {
        let snakeCaseDataValues;

        for (const key in data.dataValues) {
          snakeCaseDataValues = {
            ...snakeCaseDataValues,
            [snakeCase(key)]: data.dataValues[key],
          };
        }

        data.dataValues = snakeCaseDataValues;
        return { ...data };
      });

      return obj;
    };

    if (body && typeof body === "object") {
      const transformedBody = transformObject(body);
      return originalJson.call(res, transformedBody);
    }

    return originalJson.call(res, body);
  };

  next();
}
