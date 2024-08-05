import { Router } from "express";
import {
  projectStateCreateValidation,
  projectStateDeleteValidation,
  projectStateGetValidation,
  projectStateUpdateValidation,
} from "../validations/projectState";
import { ProjectStateController } from "../controllers/projectState";

const projectStateRouter = Router();

projectStateRouter.post(
  "/",
  projectStateCreateValidation,
  ProjectStateController.createProjectState
);
projectStateRouter.put(
  "/:id",
  projectStateUpdateValidation,
  ProjectStateController.updateProjectState
);
projectStateRouter.delete(
  "/:id",
  projectStateDeleteValidation,
  ProjectStateController.deleteProjectState
);
projectStateRouter.get(
  "/:id",
  projectStateGetValidation,
  ProjectStateController.getProjectState
);
projectStateRouter.get("/", ProjectStateController.getAllProjectStates);

export default projectStateRouter;
