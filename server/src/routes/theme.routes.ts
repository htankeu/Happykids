import { Router } from "express";
import { listThemes } from "../controllers/theme.controllers";

const themeRouter: Router = Router();

themeRouter.get("/", listThemes);

export default themeRouter;
