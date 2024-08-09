import { Router } from "express";
import {
  resourceTypeCreateValidation,
  resourceTypeGetValidation,
  resourceTypeUpdateValidation,
} from "../validations/resourceType";
import { ResourceTypeController } from "../controllers/resourceType";

const resourceTypeRouter = Router();

resourceTypeRouter.post(
  "/",
  resourceTypeCreateValidation,
  ResourceTypeController.createResourceType
);
resourceTypeRouter.put(
  "/:id",
  resourceTypeUpdateValidation,
  ResourceTypeController.updateResourceType
);
resourceTypeRouter.get(
  "/:id",
  resourceTypeGetValidation,
  ResourceTypeController.getResourceType
);
resourceTypeRouter.get("/", ResourceTypeController.getAllResourceType);

export default resourceTypeRouter;
