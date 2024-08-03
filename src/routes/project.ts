import { Router } from "express";
import { ProjectController } from "../controllers/project";
import {
  projectGetAllValidation,
  projectGetValidation,
} from "../validations/project";

const projectRouter = Router();
projectRouter.get("/:id", projectGetValidation, ProjectController.getProject);
projectRouter.get(
  "/",
  projectGetAllValidation,
  ProjectController.getAllProjects
);

export default projectRouter;
