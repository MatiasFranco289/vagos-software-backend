import { Router } from "express";
import { projectStatesController } from "../controllers/projectStates";

const projectStates = Router();

projectStates.get("/", projectStatesController.getAllStates);

export default projectStates;
