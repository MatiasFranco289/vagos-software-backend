import { NextFunction, Request, Response } from "express";
import logger from "../config/logger";

/**
 * Middleware function to capture and record the origin of a request,the endpoint it is directed to and the information passed by query, query params or body.
 *
 * @param req - Next Request.
 * @param _res - Next Response.
 * @param next - Next function.
 */
export const requestLogger = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ip: string = req.socket.remoteAddress;
  const endpoint: string = req.originalUrl;

  logger.info("");
  logger.info("---------- Start of request ----------");
  logger.info(`New request from ${ip} to ${endpoint}`);

  // Add the logs about the data in the query of the request
  logObjectKeys(req, "query");

  // Add the logs about the data in the body of the request
  logObjectKeys(req, "body");

  logger.info("---------- End of request ----------");
  next();
};

function logObjectKeys(req: Request, into: "query" | "body") {
  if (Object.keys(req[into]).length) {
    logger.info(
      `The following data was detected in the ${into} of the request: `
    );

    for (const key in req[into]) {
      logger.info(`${key}: ${req[into][key]}`);
    }
  } else {
    logger.info(`No information detected in the ${into} of the request`);
  }
}
