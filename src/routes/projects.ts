import { Router } from "express";
import { projectsController } from "../controllers/projects";
import { getAllProjectsValidation } from "../validations/projects";

const projectsRouter = Router();

projectsRouter.get(
  "/",
  getAllProjectsValidation,
  projectsController.getAllProjects
);

export default projectsRouter;
