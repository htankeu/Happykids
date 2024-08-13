import { Request, Response } from "express";
import { HttpCode } from "../enum/http-code.enums";
import ScriptExecutorService from "../services/ScriptExecutor.service";
import { ErrorType } from "../enum/error-enum";
import path from "path";
import fs from "fs";
import { error } from "console";

export const executeScript = (req: Request, res: Response) => {
  try {
    const scriptPath: string = path.join(__dirname, "..", "censor_script", "test.py");
    if (!fs.existsSync(scriptPath)) {
      return res.status(HttpCode.Bad_Gateway).json({ error: "Didn't find the searched file" });
    }

    ScriptExecutorService.execute(scriptPath, (err, result) => {
      if (err) {
        return res.status(HttpCode.Not_Found).json({ errorType: ErrorType.UserNotVerified, error: err });
      }
      return res.status(HttpCode.OK).json({ color: result, message: "Erfolgreiche Farbe" });
    });
  } catch (error) {
    console.error("We have an error: ", error);
    res.status(HttpCode.Not_Found).json({ errorType: ErrorType.UserNotVerified, error: error });
  }
};
