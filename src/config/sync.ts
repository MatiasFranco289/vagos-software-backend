// This file declares a function to synchronize all models and create the corresponding tables
// For a model to be registered correctly it is important to add it to the models array
import sequelize from "./databaseConnection";
import Users from "../models/Users";

const models = [Users];

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to DB has been established successfully.");

    models.forEach((model) => {
      console.log(`${model.name} has been registered.`);
    });

    // If this parameter is TRUE all tables will be destroyed and recreated during initialization
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
  } catch (err) {
    console.error(
      "An unexpected error has occurred while trying to connect to the DB.",
      err
    );
  }
};

export default syncDatabase;
