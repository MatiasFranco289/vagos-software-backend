// This file declares a function to synchronize all models and create the corresponding tables
// For a model to be registered correctly it is important to add it to the models array
import sequelize from "./dbConnection";
import User from "../models/User";
import Role from "../models/Role";
import { DEVELOPMENT } from "../constants";

const models = [User, Role];

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to DB has been established successfully.");

    models.forEach((model) => {
      console.log(`${model.name} has been registered.`);
    });

    // If this parameter is TRUE all tables will be destroyed and recreated during initialization.
    // This parameter is TRUE if you are in production
    await sequelize.sync({ force: process.env.NODE_ENV === DEVELOPMENT });
    console.log("All models were synchronized successfully.");
  } catch (err) {
    console.error(
      "An unexpected error has occurred while trying to connect to the DB.",
      err
    );
  }
};

export default syncDatabase;
