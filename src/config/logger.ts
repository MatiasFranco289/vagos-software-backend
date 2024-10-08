import { createLogger, format, transports } from "winston";
import moment from "moment-timezone";
import path from "path";

const rootPath = path.resolve(process.cwd());

/**Logger setup for winston, logs are saved to /src/logs, the timezone is setted to Argentina (GMT -3) */
const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: () => moment().tz("America/Argentina/Buenos_Aires").format(),
    }),
    format.printf(
      (info) => `[${info.timestamp}] [${info.level}]: ${info.message}`
    )
  ),
  transports: [
    new transports.File({
      maxsize: 5120000,
      maxFiles: 5,
      filename: `${rootPath}/src/logs/logs-backend.log`,
    }),
    new transports.Console({
      level: "debug",
    }),
  ],
});

export default logger;
