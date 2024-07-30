import { Router } from "express";
import { RoleController } from "../controllers/role";
import { roleCreateValidation, roleDeleteValidation, roleGetValidation, roleUpdateValidation } from "../validations/role";

const roleRouter = Router();

roleRouter.post("/create", roleCreateValidation, RoleController.createRole);
roleRouter.post("/update", roleUpdateValidation, RoleController.updateRole);
roleRouter.delete("/delete", roleDeleteValidation, RoleController.deleteRole);
roleRouter.get("/get", roleGetValidation, RoleController.getRole);
roleRouter.get("/", RoleController.getAllRoles);

export default roleRouter;
