import { Request, RequestHandler, Response, response } from "express";
import { UserService } from "../services/User.service";
import { HttpCode } from "../enum/http-code.enums";
import { ErrorParser } from "../Error-parser/error.parser";
import { User } from "../entity/User.entity";
import { listResult } from "../models/resultList.model";
import { pageList } from "../models/PageList.model";
import { IUser } from "../interfaces/User.interface";
import { OpenAiService } from "../services/OpenAI.service";
import { UserListFilter } from "../models/UserListFilter.model";

const userService: UserService = new UserService();
const openaiService: OpenAiService = new OpenAiService();

export const listUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { page = "1", take = "5", search = "" } = req.query;

    const filterOptions: UserListFilter = {
      search: search.toString() || "",
      sort: "ASC",
    };

    const data: listResult<User> = await userService.list(Number(page), Number(take), filterOptions);

    const result: pageList<User[]> = {
      currentPage: Number(page),
      data: data.data,
      total: data.total,
    };

    openaiService.createCompletion("", "", 1);
    res.status(HttpCode.OK).json(result);
  } catch (error) {
    console.error("An Error was thrown", error);
    res.status(HttpCode.Internal_server_Error).json({ error: ErrorParser.parseError(error) });
  }
};

export const deleteUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId.toString();

    await userService.deleteById(userId);
    res.sendStatus(HttpCode.Accepted);
  } catch (error) {
    console.error("An Error was thrown", error);
    res.json(HttpCode.BadRequest).json({ error: ErrorParser.parseError(error) });
  }
};

export const getUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId.toString();
    const user: User | null = await userService.readById(userId);
    if (user) return res.status(HttpCode.OK).send(user);
    return res.status(HttpCode.No_Content).json({ error: "Not user with this ID" });
  } catch (error) {
    console.error("An Error was thrown", error);
    res.json(HttpCode.BadRequest).json({ error: ErrorParser.parseError(error) });
  }
};

export const updateUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId.toString();
    const updateResources: IUser = req.body;

    const update: boolean = await userService.putById(userId, updateResources);
    if (update) return res.status(HttpCode.Accepted);
    return res.status(HttpCode.Not_Acceptable);
  } catch (error) {
    console.error("An Error was thrown", error);
    res.json(HttpCode.BadRequest).json({ error: ErrorParser.parseError(error) });
  }
};

export const userNextLevel: RequestHandler = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId.toString();

    await userService.addLevel(userId);

    res.status(HttpCode.OK).json({ response: "User level upgrade" });
  } catch (error) {
    console.error("An Error was thrown", error);
    res.json(HttpCode.BadRequest).json({ error: ErrorParser.parseError(error) });
  }
};

export const addUserPoints: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { Points } = req.body;
    const userId: string = req.params.userId.toString();
    const points: number = Number(Points);

    await userService.addPoints(userId, points);

    res.status(HttpCode.OK).json({ response: "Points zugefügt" });
  } catch (error) {
    console.error("An Error was thrown", error);
    res.json(HttpCode.BadRequest).json({ error: ErrorParser.parseError(error) });
  }
};
