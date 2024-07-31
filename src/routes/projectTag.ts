import { Router } from "express";
import { ProjectTagController } from "../controllers/projectTag";
import {
  projectTagCreateValidation,
  projectTagDeleteValidation,
  projectTagGetValidation,
  projectTagUpdateValidation,
} from "../validations/projectTag";

const projectTagRouter = Router();
projectTagRouter.post(
  "/",
  projectTagCreateValidation,
  ProjectTagController.createProjectTag
);
projectTagRouter.put(
  "/:id",
  projectTagUpdateValidation,
  ProjectTagController.updateProjectTag
);
projectTagRouter.delete(
  "/:id",
  projectTagDeleteValidation,
  ProjectTagController.deleteProjectTags
);
projectTagRouter.get(
  "/:id",
  projectTagGetValidation,
  ProjectTagController.getProjectTag
);
projectTagRouter.get("/", ProjectTagController.getAllProjectTags);

export default projectTagRouter;
