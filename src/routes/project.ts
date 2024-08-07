import { Router } from "express";
import { ProjectController } from "../controllers/project";
import {
  projectCreateValidation,
  projectGetAllValidation,
  projectGetValidation,
  projectUpdateValidation,
} from "../validations/project";

const projectRouter = Router();

projectRouter.post(
  "/",
  projectCreateValidation,
  ProjectController.createProject
);
projectRouter.put(
  "/:id",
  projectUpdateValidation,
  ProjectController.updateProject
);
projectRouter.get("/:id", projectGetValidation, ProjectController.getProject);
projectRouter.get(
  "/",
  projectGetAllValidation,
  ProjectController.getAllProjects
);

export default projectRouter;
