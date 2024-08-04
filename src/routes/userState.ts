import { Router } from "express";
import {
  userStateCreateValidation,
  userStateDeleteValidation,
  userStateGetValidation,
  userStateUpdateValidation,
} from "../validations/userState";
import { UserStateController } from "../controllers/userState";

const userStateRouter = Router();

userStateRouter.post(
  "/",
  userStateCreateValidation,
  UserStateController.createUserState
);
userStateRouter.put(
  "/:id",
  userStateUpdateValidation,
  UserStateController.updateUserState
);
userStateRouter.delete(
  "/:id",
  userStateDeleteValidation,
  UserStateController.deleteUserState
);
userStateRouter.get(
  "/:id",
  userStateGetValidation,
  UserStateController.getUserState
);
userStateRouter.get("/", UserStateController.getAllUserStates);

export default userStateRouter;
