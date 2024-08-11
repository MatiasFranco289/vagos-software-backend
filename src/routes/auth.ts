import { Router } from "express";
import { AuthController } from "../controllers/auth";
import { authValidation } from "../validations/auth";

const authRouter = Router();

authRouter.post("/login", authValidation, AuthController.login);

export default authRouter;
