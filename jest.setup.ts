// All the operations declared here are executed before run tests
import { startServer } from "./src/config/server";
import sequelize from "./src/config/databaseConnection";

let server;

beforeAll(async () => {
  server = await startServer();
});

afterAll(async () => {
  sequelize.close();

  if (server) {
    server.close();
  }
});
