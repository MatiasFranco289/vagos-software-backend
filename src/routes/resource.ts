import { Router } from "express";
import {
  resourceCreateValidation,
  resourceDeleteValidation,
  resourceGetAllValidation,
  resourceGetValidation,
  resourceUpdateValidation,
} from "../validations/resource";
import { ResourceController } from "../controllers/resource";

const resourceRouter = Router();

resourceRouter.post(
  "/",
  resourceCreateValidation,
  ResourceController.createResource
);
resourceRouter.put(
  "/:id",
  resourceUpdateValidation,
  ResourceController.updateResource
);
resourceRouter.delete(
  "/:id",
  resourceDeleteValidation,
  ResourceController.deleteResource
);
resourceRouter.get(
  "/:id",
  resourceGetValidation,
  ResourceController.getResource
);
resourceRouter.get(
  "/",
  resourceGetAllValidation,
  ResourceController.getAllResource
);

export default resourceRouter;
