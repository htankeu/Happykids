import { Request, RequestHandler, Response } from "express";
import { listResult } from "../models/resultList.model";
import { Role } from "../entity/Role.entity";
import { RoleService } from "../services/Role.service";
import { pageList } from "../models/PageList.model";
import { HttpCode } from "../enum/http-code.enums";
import { ErrorParser } from "../Error-parser/error.parser";
import { IRole } from "../interfaces/Role.interface";

const roleService: RoleService = new RoleService();
export const listRole: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { page = "1", take = "5" } = req.query;
    const result: listResult<Role> = await roleService.list(Number(page), Number(take));

    const data: pageList<Role[]> = {
      currentPage: Number(page),
      data: result.data,
      total: result.total,
    };

    res.status(HttpCode.OK).json(data);
  } catch (error) {
    console.error("An Error was thrown", error);
    res.status(HttpCode.Internal_server_Error).json({ error: ErrorParser.parseError(error) });
  }
};

export const getRole: RequestHandler = async (req: Request, res: Response) => {
  try {
    const roleId: string = req.params.roleId.toString();
    const role: Role | null = (await roleService.readById(roleId)) as Role;
    if (role) return res.status(HttpCode.OK).send(role);
    return res.status(HttpCode.No_Content).json({ error: "No role with this ID" });
  } catch (error) {
    console.error("An Error was thrown", error);
    res.status(HttpCode.Internal_server_Error).json({ error: ErrorParser.parseError(error) });
  }
};

export const updateRole: RequestHandler = async (req: Request, res: Response) => {
  try {
    const roleId: string = req.params.roleId.toString();
    const updateResources: IRole = req.body as IRole;

    const update: boolean = await roleService.putById(roleId, updateResources);
    if (update) return res.status(HttpCode.Accepted);
    return res.status(HttpCode.Not_Acceptable);
  } catch (error) {
    console.error("An Error was thrown", error);
    res.status(HttpCode.Internal_server_Error).json({ error: ErrorParser.parseError(error) });
  }
};

export const deleteRole: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId.toString();

    await roleService.deleteById(userId);
    res.sendStatus(HttpCode.Accepted);
  } catch (error) {
    console.error("An Error was thrown", error);
    res.status(HttpCode.Internal_server_Error).json({ error: ErrorParser.parseError(error) });
  }
};
