import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth";
import roleRouter from "./routes/role";
import { startServer } from "./config/server";
import { DEVELOPMENT_ENVIRONMENT, PRODUCTION_ENVIRONMENT } from "./constants";
import projectTagRouter from "./routes/projectTag";
import blogTagRouter from "./routes/blogTag";
import projectStateRouter from "./routes/projectState";
import userStateRouter from "./routes/userState";
import userRouter from "./routes/user";
import projectRouter from "./routes/project";
import blogRouter from "./routes/blog";
import resourceTypeRouter from "./routes/resourceType";
import resourceRouter from "./routes/resource";

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
apiRouter.use("/user-state", userStateRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/project-tag", projectTagRouter);
apiRouter.use("/project-state", projectStateRouter);
apiRouter.use("/project", projectRouter);
apiRouter.use("/blog-tag", blogTagRouter);
apiRouter.use("/blog", blogRouter);
apiRouter.use("/resource", resourceRouter);
apiRouter.use("/resource-type", resourceTypeRouter);

// If the environment is dev or prod server is started here
if (
  [PRODUCTION_ENVIRONMENT, DEVELOPMENT_ENVIRONMENT].includes(
    process.env.NODE_ENV
  )
) {
  startServer();
}

export default app;
