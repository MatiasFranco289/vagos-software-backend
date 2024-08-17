// This file declare routes for project only for admins
import { Router } from "express";
import { projectsAdminController } from "../controllers/projects";
import { createProjectValidation } from "../validations/projects";

const projectsAdminRouter = Router();

projectsAdminRouter.post(
  "/",
  createProjectValidation,
  projectsAdminController.createProject
);

export default projectsAdminRouter;
