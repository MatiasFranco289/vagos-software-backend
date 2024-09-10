import { Router } from "express";
import { usersController } from "../controllers/users";
import { createUserValidation } from "../validations/users";

const usersAdminRouter = Router();

usersAdminRouter.post("/", createUserValidation, usersController.createUser);

export default usersAdminRouter;
