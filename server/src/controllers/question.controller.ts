import { Request, RequestHandler, Response } from "express";
import { OTHEME } from "../enum/theme-enum";
import { HttpCode } from "../enum/http-code.enums";
import { ErrorParser } from "../Error-parser/error.parser";
import { QuestionService } from "../services/Question.service";
import { Question } from "../entity/Question.entity";
import { listResult } from "../models/resultList.model";
import { pageList } from "../models/PageList.model";
import { OLEVEL } from "../enum/level.enum";
import { QuestionListFilter } from "../models/QuestionListFilter.model";

const questionService: QuestionService = new QuestionService();

export const createQuestion: RequestHandler = async (req: Request, res: Response) => {
  const { questionsTheme, numberQuestion, userLevel } = req.query;
  const themeValue: string = questionsTheme ? questionsTheme.toString() : "";
  const questionNuber: number = Number(numberQuestion) || 15;
  if (!userLevel) return res.status(HttpCode.BadRequest).json({ error: "Kein Niveau wurde eingegeben" });

  const levelValue: string = userLevel.toString();
  const theme: OTHEME = themeValue as OTHEME;
  const level: OLEVEL = levelValue as OLEVEL;
  if (!(level || OLEVEL[level] || theme || OTHEME[theme]))
    return res.status(HttpCode.Not_Found).json({ error: "Kein Level oder Thema gefunden" });

  try {
    await questionService.generateQuestion(theme, questionNuber, level);
    res.status(HttpCode.OK).json({ success: "Success" });
  } catch (error) {
    console.error("An Error was thrown", error);
    res.status(HttpCode.Internal_server_Error).json({ error: ErrorParser.parseError(error) });
  }
};

export const listQuestion: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { page = "1", take = "5", level, theme } = req.query;

    const filterOptions: QuestionListFilter = {
      Level: level ? level.toString() : "",
      Theme: theme ? theme.toString() : "",
    };

    const data: listResult<Question> = await questionService.list(Number(page), Number(take), filterOptions);

    const result: pageList<Question[]> = {
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
