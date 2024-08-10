import syncDatabase from "./sync";
import createAssociations from "./associations";
import preloadData from "./preload";
import app from "../../src/index";
import http from "http";

export default async function startServer() {
  const port = process.env.API_PORT;

  await syncDatabase();
  await createAssociations();
  await preloadData();

  return new Promise<http.Server>((resolve, reject) => {
    const server = app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
      resolve(server);
    });
    server.on("error", reject);
  });
}
