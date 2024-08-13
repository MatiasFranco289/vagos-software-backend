import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth";
import startServer from "./config/server";
import swaggerSetup from "./config/swagger";
import bodyKeysToSnakeCase from "./middlewares/bodyToSnakeCaseMiddleware";
import { ROLENAME_ADMIN, ROLENAME_USER, TESTING } from "./constants";
import { validateToken } from "./middlewares/auth";
import tagRouter from "./routes/tags";

dotenv.config();
const app = express();
const apiRouter = express.Router();
const corsOptions = {
  origin: process.env.FRONTEND_BASE_URL,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api", apiRouter);

apiRouter.use(bodyKeysToSnakeCase);

swaggerSetup(apiRouter);

apiRouter.use("/auth", authRouter);

// Routes below this point are only for users or admin
/* apiRouter.use(validateToken([ROLENAME_ADMIN, ROLENAME_USER])); */
apiRouter.use("/tags", tagRouter);

// Routes below this point are only for admins or admin
/* apiRouter.use(validateToken([ROLENAME_ADMIN])); */

if (process.env.NODE_ENV !== TESTING) {
  startServer();
}

export default app;
