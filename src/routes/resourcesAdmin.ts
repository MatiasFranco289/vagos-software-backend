import { Router } from "express";
import { createResourceValidation } from "../validations/resources";
import { resourcesController } from "../controllers/resources";

const resourcesAdminRouter = Router();

resourcesAdminRouter.post(
  "/",
  createResourceValidation,
  resourcesController.createResource
);

export default resourcesAdminRouter;
