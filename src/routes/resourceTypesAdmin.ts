import { Router } from "express";
import { resourceTypesController } from "../controllers/resourceTypes";
import { createResourceTypeValidation } from "../validations/resourceTypes";

const resourceTypesAdminRouter = Router();

resourceTypesAdminRouter.get("/", resourceTypesController.getAllResourceTypes);
resourceTypesAdminRouter.post(
  "/",
  createResourceTypeValidation,
  resourceTypesController.createResourceType
);

export default resourceTypesAdminRouter;
