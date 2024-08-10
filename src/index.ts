// TODO: Create login endpoint
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth";
import startServer from "./config/server";
dotenv.config();

const app = express();
const apiRouter = express.Router();
const port = process.env.API_PORT;
const corsOptions = {
  origin: process.env.FRONTEND_BASE_URL,
};

app.use(cors(corsOptions));

app.use("/api", apiRouter);

apiRouter.use("/auth", authRouter);

startServer();

export default app;
