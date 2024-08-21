// This file declare routes for project only for admins
import { Router } from "express";
import { projectsController } from "../controllers/projects";
import { createProjectValidation } from "../validations/projects";

const projectsAdminRouter = Router();

projectsAdminRouter.post(
  "/",
  createProjectValidation,
  projectsController.createProject
);

export default projectsAdminRouter;
