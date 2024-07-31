// All the operations declared here are executed before run tests
import { startServer } from "./src/config/server";

beforeAll(async () => {
  await startServer();
});
