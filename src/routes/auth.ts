import { Router } from "express";
import { AuthController } from "../controllers/auth";

const authRouter = Router();

authRouter.post("/login", AuthController.login);
authRouter.post("/login-failed", AuthController.loginFailed);
authRouter.post("/login-invalid-token", AuthController.loginInvalidToken);

export default authRouter;
