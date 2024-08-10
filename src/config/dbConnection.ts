import { Sequelize } from "sequelize";

const DB_NAME = process.env.POSTGRES_DB;
const DB_USER = process.env.POSTGRES_USER;
const DB_PASSWORD = process.env.POSTGRES_PASSWORD;
const DB_HOST = "db";

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
});

export default sequelize;
