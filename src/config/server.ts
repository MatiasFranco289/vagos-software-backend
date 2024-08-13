import syncDatabase from "./sync";
import createAssociations from "./associations";
import preloadData from "./preload";
import app from "../../src/index";
import { Server } from "http";

export default async function startServer() {
  const domain = process.env.API_DOMAIN;
  const port = process.env.API_PORT;

  await createAssociations();
  await syncDatabase();
  await preloadData();

  return new Promise<Server>((resolve, reject) => {
    const server = app.listen(port, () => {
      console.log(`Server running at ${domain}:${port}/`);
      resolve(server);
    });
    server.on("error", reject);
  });
}
