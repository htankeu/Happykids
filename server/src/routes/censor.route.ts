import { Router } from "express";
import { executeScript } from "../controllers/censor.controller";

export const CensorRoutes: Router = Router();

CensorRoutes.get("/color", executeScript);
