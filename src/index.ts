import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth";
import roleRouter from "./routes/role";
import projectTagRouter from "./routes/projectTag";
import { startServer } from "./config/server";
import { DEVELOPMENT_ENVIRONMENT, PRODUCTION_ENVIRONMENT } from "./constants";

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

// If the environment is dev or prod server is started here
if (
  [PRODUCTION_ENVIRONMENT, DEVELOPMENT_ENVIRONMENT].includes(
    process.env.NODE_ENV
  )
) {
  startServer();
}

export default app;
