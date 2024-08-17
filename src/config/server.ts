import syncDatabase from "./sync";
import createAssociations from "./associations";
import app from "../../src/index";
import { Server } from "http";
import { DEVELOPMENT } from "../constants";
export default async function startServer() {
  const domain = process.env.API_DOMAIN;
  const port = process.env.API_PORT;

  await createAssociations();
  await syncDatabase();

  // If you are in dev environment some default data is pre loaded
  if (process.env.NODE_ENV === DEVELOPMENT) {
    const preloadData = await require("./preload");
    await preloadData.default();
  } else {
    console.log(
      "Non development environment detected. Skipping entities preloading."
    );
  }

  return new Promise<Server>((resolve, reject) => {
    const server = app.listen(port, () => {
      console.log(`Server running at ${domain}:${port}/`);
      resolve(server);
    });
    server.on("error", reject);
  });
}
