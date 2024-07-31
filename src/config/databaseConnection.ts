import { Sequelize } from "sequelize";
import { TESTING_ENVIRONMENT } from "../constants";

const ENVIRONMENT = process.env.NODE_ENV;

const DB_NAME =
  ENVIRONMENT === TESTING_ENVIRONMENT
    ? "vagos_test_db"
    : process.env.POSTGRES_DB;
const DB_USER =
  ENVIRONMENT === TESTING_ENVIRONMENT ? "postgres" : process.env.POSTGRES_USER;
const DB_PASSWORD =
  ENVIRONMENT === TESTING_ENVIRONMENT
    ? "postgres"
    : process.env.POSTGRES_PASSWORD;
const DB_HOST = ENVIRONMENT !== TESTING_ENVIRONMENT ? "db" : "localhost";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
});

export default sequelize;
