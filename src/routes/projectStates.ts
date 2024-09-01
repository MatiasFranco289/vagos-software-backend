import { Router } from "express";
import { projectStatesController } from "../controllers/projectStates";

const projectStatesRouter = Router();

projectStatesRouter.get("/", projectStatesController.getAllStates);

export default projectStatesRouter;
