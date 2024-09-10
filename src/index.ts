import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth";
import startServer from "./config/server";
import swaggerSetup from "./config/swagger";
import bodyKeysToSnakeCase from "./middlewares/bodyToSnakeCaseMiddleware";
import { ROLENAME_ADMIN, TESTING } from "./constants";
import { validateToken } from "./middlewares/auth";
import tagRouter from "./routes/tags";
import projectsRouter from "./routes/projects";
import projectsAdminRouter from "./routes/projectsAdmin";
import resourcesAdminRouter from "./routes/resourcesAdmin";
import projectStatesRouter from "./routes/projectStates";
import blogsAdminRouter from "./routes/blogsAdmin";
import userAdminRouter from "./routes/usersAdmin";

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

swaggerSetup(apiRouter);

apiRouter.use(bodyKeysToSnakeCase);

apiRouter.use("/auth", authRouter);

apiRouter.use("/projects/tags", tagRouter);
apiRouter.use("/projects/status", projectStatesRouter);
apiRouter.use("/projects", projectsRouter);

// Routes below this point are only for admins or admin
apiRouter.use(validateToken([ROLENAME_ADMIN]));

apiRouter.use("/admin/projects", projectsAdminRouter);
apiRouter.use("/admin/projects/resources", resourcesAdminRouter);
apiRouter.use("/admin/blogs", blogsAdminRouter);
apiRouter.use("/users", userAdminRouter);

if (process.env.NODE_ENV !== TESTING) {
  startServer();
}

export default app;
