import { NextFunction, Request, Response } from "express";
import { IUser } from "../interfaces/User.interface";
import { HttpCode } from "../enum/http-code.enums";
import { ValidationHelper } from "../helper/validationHelper";
import { ErrorType } from "../enum/error-enum";
import { AuthService } from "../services/Auth.service";

const authService: AuthService = new AuthService();
export const login = async (req: Request, res: Response) => {
  try {
    const { userAccount, password } = req.body;
    if (!ValidationHelper.checkHappyAccount(userAccount))
      return res
        .status(HttpCode.BadRequest)
        .json({ error: { error_type: ErrorType.InvalidInput, message: "This user is not a HappyUser" } });

    const data = await authService.login(userAccount, password);
    if (data.tokenId) return res.status(HttpCode.OK).json({ tokenId: data.tokenId, message: "Erfolgreiche Anmeldung", userId: data.userId.toString() });

    res.status(HttpCode.Unauthorized).json({ message: "Authentication failed" });
  } catch (error) {
    console.error("We have an error: ", error);
    res.status(HttpCode.Not_Found).json({ errorType: ErrorType.UserNotVerified, error: error });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const userData: IUser = req.body as IUser;
    const checkValues = ["Email", "Password", "Username"];

    if (ValidationHelper.checkPropertiesNullOrEmpty<IUser>(userData, checkValues))
      return res.status(HttpCode.BadRequest).json({ error: ErrorType.InvalidInput });

    userData.Username = `Happy${userData.Username}`

    await authService.register(userData);
    return res.status(HttpCode.OK).send("User saved");
  } catch (error) {
    return res.status(HttpCode.BadRequest).json({ error: `${error}` });
  }
};

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authToken: string | undefined = req.headers.authorization?.split(" ")[1];
  if (!authToken) return res.status(HttpCode.Unauthorized).json({ message: "No token provided" });

  try {
    const isAuthenticated = await authService.isAuthenticated(authToken);
    if (!isAuthenticated) return res.status(HttpCode.Unauthorized).json({ message: "User is not Authenticated" });

    res.status(HttpCode.OK).json({ message: "User is authenticated" });
    next();
  } catch (error) {
    console.error("We have an error: ", error);
    res.status(HttpCode.Not_Found).json({ errorType: ErrorType.UserNotVerified, error: error });
  }
};
