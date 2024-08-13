import { Router } from "express";
import { deleteRole, getRole, listRole, updateRole } from "../controllers/role.controller";

const rolesRouter: Router = Router();

rolesRouter.get("/", listRole);
rolesRouter.route("/:roleId").get(getRole).delete(deleteRole).put(updateRole);

export default rolesRouter;
