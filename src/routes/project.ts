import { Router } from "express";
import { ProjectController } from "../controllers/project";
import { projectGetValidation } from "../validations/project";

const projectRouter = Router();
projectRouter.get("/:id", projectGetValidation, ProjectController.getProject);

export default projectRouter;
