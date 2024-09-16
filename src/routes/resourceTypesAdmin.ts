import { Router } from "express";
import { resourceTypesController } from "../controllers/resourceTypes";
import {
  createResourceTypeValidation,
  updateResourceTypeValidation,
} from "../validations/resourceTypes";

const resourceTypesAdminRouter = Router();

resourceTypesAdminRouter.get("/", resourceTypesController.getAllResourceTypes);
resourceTypesAdminRouter.post(
  "/",
  createResourceTypeValidation,
  resourceTypesController.createResourceType
);
resourceTypesAdminRouter.put(
  "/:id",
  updateResourceTypeValidation,
  resourceTypesController.updateResourceType
);

export default resourceTypesAdminRouter;
