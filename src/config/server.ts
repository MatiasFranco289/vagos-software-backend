import syncDatabase from "./sync";
import app from "../../src/index";

export const startServer = async () => {
  const port = process.env.API_PORT;

  await syncDatabase();
  return new Promise<void>((resolve, reject) => {
    const server = app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
      resolve();
    });
    server.on("error", reject);
  });
};
