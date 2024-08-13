import { Request, RequestHandler, Response } from "express";
import { HttpCode } from "../enum/http-code.enums";
import { ErrorParser } from "../Error-parser/error.parser";
import { QuizService } from "../services/Quiz.service";
import { Quiz } from "../entity/Quiz.entity";

const quizService: QuizService = new QuizService();

export const createQuiz: RequestHandler = async (req: Request, res: Response) => {
  try {
    const data: Quiz = await quizService.create({});
    res.status(HttpCode.OK).json({ quiz: data });
  } catch (error) {
    console.error("An Error was thrown", error);
    res.status(HttpCode.Internal_server_Error).json({ error: ErrorParser.parseError(error) });
  }
};
