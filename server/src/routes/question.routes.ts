import { Router } from "express";
import { createQuestion, listQuestion } from "../controllers/question.controller";

const questionRouter: Router = Router();

questionRouter.get("/", listQuestion);
questionRouter.get("/generate", createQuestion);

export default questionRouter;
