import { Router } from "express";
import { resourceTypesController } from "../controllers/resourceTypes";

const resourceTypesAdminRouter = Router();

resourceTypesAdminRouter.get("/", resourceTypesController.getAllResourceTypes);

export default resourceTypesAdminRouter;
