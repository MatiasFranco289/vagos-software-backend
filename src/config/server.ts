import syncDatabase from "./sync";
import app from "../../src/index";
import http from "http";

export const startServer = async () => {
  const port = process.env.API_PORT;

  await syncDatabase();
  return new Promise<http.Server>((resolve, reject) => {
    const server = app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
      resolve(server);
    });
    server.on("error", reject);
  });
};
