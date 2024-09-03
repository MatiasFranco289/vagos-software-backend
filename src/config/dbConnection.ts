import { Sequelize } from "sequelize";
import { PRODUCTION, TESTING } from "../constants";
import dotenv from "dotenv";

dotenv.config();

const ENVIRONMENT = process.env.NODE_ENV;
const DB_NAME =
  ENVIRONMENT !== TESTING ? process.env.POSTGRES_DB : "vagos_software_test_db";
const DB_USER =
  ENVIRONMENT !== TESTING ? process.env.POSTGRES_USER : "postgres";
const DB_PASSWORD =
  ENVIRONMENT !== TESTING ? process.env.POSTGRES_PASSWORD : "postgres";
const DB_HOST =
  ENVIRONMENT === TESTING || ENVIRONMENT === PRODUCTION ? "localhost" : "db";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
});

export default sequelize;
