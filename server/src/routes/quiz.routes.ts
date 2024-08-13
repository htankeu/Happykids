import { Router } from "express";
import { createQuiz } from "../controllers/quiz.controller";

const quizRouter: Router = Router();

quizRouter.get("/create", createQuiz);

export default quizRouter;
