import { Router } from "express";
import { getNextLevel } from "../controllers/level.controller";

const levelRouter: Router = Router();

levelRouter.get("/nextlevel", getNextLevel);

export default levelRouter;
