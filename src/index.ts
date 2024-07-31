import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth";
import roleRouter from "./routes/role";
import syncDatabase from "./config/sync";
import projectTagRouter from "./routes/projectTag";

dotenv.config();

const app = express();
const apiRouter = express.Router();
const port = process.env.API_PORT;
const corsOptions = {
  origin: process.env.FRONTEND_BASE_URL,
  credentials: true,
};

app.use(express.json());

app.use(cors(corsOptions));

app.use("/api", apiRouter);

apiRouter.use("/auth", authRouter);
apiRouter.use("/role", roleRouter);
apiRouter.use("/project-tag", projectTagRouter);

syncDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
});
