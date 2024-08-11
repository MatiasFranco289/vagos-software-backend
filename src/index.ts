import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth";
import startServer from "./config/server";
import swaggerSetup from "./config/swagger";
import bodyKeysToSnakeCase from "./middlewares/bodyToSnakeCaseMiddleware";
import { TESTING } from "./constants";

dotenv.config();
const app = express();
const apiRouter = express.Router();
const corsOptions = {
  origin: process.env.FRONTEND_BASE_URL,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api", apiRouter);

apiRouter.use(bodyKeysToSnakeCase);

swaggerSetup(apiRouter);

apiRouter.use("/auth", authRouter);

if (process.env.NODE_ENV !== TESTING) {
  startServer();
}

export default app;
