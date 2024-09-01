import { Router } from "express";
import { authController } from "../controllers/auth";
import { authValidation } from "../validations/auth";

const authRouter = Router();

authRouter.post("/login", authValidation, authController.login);
authRouter.post("/logout", authController.logout);

export default authRouter;
