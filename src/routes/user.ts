import { Router } from "express";
import {
  userCreateValidation,
  userDeleteValidation,
  userGetAllValidation,
  userGetValidation,
  userUpdateValidation,
} from "../validations/user";
import { UserController } from "../controllers/user";

const userRouter = Router();

userRouter.post("/", userCreateValidation, UserController.createUser);
userRouter.put("/:id", userUpdateValidation, UserController.updateUser);
userRouter.delete("/:id", userDeleteValidation, UserController.deleteUser);
userRouter.get("/:id", userGetValidation, UserController.getUser);
userRouter.get("/", userGetAllValidation, UserController.getAllUsers);

export default userRouter;
