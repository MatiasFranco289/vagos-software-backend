import { Router } from "express";
import { RoleController } from "../controllers/role";
import { roleCreateValidation, roleDeleteValidation, roleGetValidation, roleUpdateValidation } from "../validations/role";

const roleRouter = Router();

roleRouter.post("/", roleCreateValidation, RoleController.createRole);
roleRouter.put("/:id", roleUpdateValidation, RoleController.updateRole);
roleRouter.delete("/:id", roleDeleteValidation, RoleController.deleteRole);
roleRouter.get("/:id", roleGetValidation, RoleController.getRole);
roleRouter.get("/", RoleController.getAllRoles);

export default roleRouter;
