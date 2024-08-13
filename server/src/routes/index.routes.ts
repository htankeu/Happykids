import { Router } from "express";
import { authRouter } from "./auth.routes";
import userRouter from "./user.routes";
import rolesRouter from "./role.routes";
import questionRouter from "./question.routes";
import quizRouter from "./quiz.routes";
import levelRouter from "./level.routes";
import themeRouter from "./theme.routes";
import { CensorRoutes } from "./censor.route";

const indexRouter = Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/user", userRouter);
indexRouter.use("/role", rolesRouter);
indexRouter.use("/question", questionRouter);
indexRouter.use("/quiz", quizRouter);
indexRouter.use("/level", levelRouter);
indexRouter.use("/theme", themeRouter);
indexRouter.use("/censor", CensorRoutes);

export default indexRouter;
