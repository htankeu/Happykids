import { Request, RequestHandler, Response } from "express";
import { LevelService } from "../services/Level.service";
import { UserService } from "../services/User.service";
import { User } from "../entity/User.entity";
import { Level } from "../entity/Level.entity";
import { ILevel } from "../interfaces/Level.interface";
import { HttpCode } from "../enum/http-code.enums";
import { ErrorParser } from "../Error-parser/error.parser";

const levelService: LevelService = new LevelService();
const userService: UserService = new UserService();
export const getNextLevel: RequestHandler = async (req: Request, res: Response) => {
  const { UserId } = req.params;

  const user: User | null = await userService.readById(UserId);
  if (!user) return res.status(HttpCode.Internal_server_Error).json({ error: "No User with this ID" });
  const userLevelid: number = user.LevelId;
  const userLevel: Level | ILevel | null = await levelService.readById(userLevelid);
  if (!userLevel) return res.status(HttpCode.Internal_server_Error).json({ error: "Not Level exist for this user" });
  const userLevelgrad: number = Number(userLevel.grad);

  const nextLevel: Level | ILevel | null = await levelService.readByGrad(userLevelgrad + 1);
  if (!nextLevel) return res.status(HttpCode.Internal_server_Error).json({ error: "Not more Level" });

  res.status(HttpCode.OK).json({ NextLevel: nextLevel.Level });

  try {
  } catch (error) {
    res.status(HttpCode.Internal_server_Error).json({ error: ErrorParser.parseError(error) });
  }
};
