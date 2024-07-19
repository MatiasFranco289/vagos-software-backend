import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth";

dotenv.config();

const app = express();
const apiRouter = express.Router();
const port = process.env.API_PORT;
const corsOptions = {
  origin: process.env.FRONTEND_BASE_URL,
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api", apiRouter);

apiRouter.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
