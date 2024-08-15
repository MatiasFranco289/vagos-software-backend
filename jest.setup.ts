import sequelize from "./src/config/dbConnection";
import startServer from "./src/config/server";

let server;

beforeAll(async () => {
  server = await startServer();
});

afterAll(async () => {
  await server.close();
  await sequelize.close();
});
