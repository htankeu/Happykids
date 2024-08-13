import { Request, RequestHandler, Response } from "express";
import { ThemeService } from "../services/Theme.service";
import { Theme } from "../entity/Theme.entity";
import { listResult } from "../models/resultList.model";
import { pageList } from "../models/PageList.model";
import { HttpCode } from "../enum/http-code.enums";
import { ErrorParser } from "../Error-parser/error.parser";

const themeService: ThemeService = new ThemeService();

export const listThemes: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { page = 1, take = 6 } = req.params;

    const data: listResult<Theme> = await themeService.list(Number(page), Number(take));

    const result: pageList<Theme[]> = {
      currentPage: Number(page),
      data: data.data,
      total: data.total,
    };

    res.status(HttpCode.OK).json(result);
  } catch (error) {
    console.error("An Error was thrown", error);
    res.status(HttpCode.Internal_server_Error).json({ error: ErrorParser.parseError(error) });
  }
};
