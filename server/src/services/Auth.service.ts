import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import { IUser } from "../interfaces/User.interface";
import { DBRoles } from "../basic-datas/basic-roles";
import { Level } from "../entity/Level.entity";
import { UserService } from "./User.service";
import { ErrorType } from "../enum/error-enum";
import dotenv from "dotenv";
import { ErrorParser } from "../Error-parser/error.parser";
import { User } from "../entity/User.entity";

dotenv.config();

export class AuthService {
  private userService = new UserService();
  private SECRET_TOKEN: Secret = process.env.ACCESS_SECRET_TOKEN || "";
  private REFRESH_TOKEN: Secret = process.env.ACCESS_REFRESH_TOKEN || "";

  async register(user: IUser) {
    this.setUserDefault(user);
    await this.userService.create(user);
  }

  async login(username: string, password: string) {
    const user: User | null =
      (await this.userService.readByName(username)) || (await this.userService.readByEmail(username));

    if (!user) throw Error(ErrorType.WrongCredentials);

    const userPassword: string = user.Password!;
    if (!this.isValidPassword(password, userPassword)) throw Error(ErrorType.WrongCredentialsPass);

    const userWithoutPass: IUser = {
      id: user.id,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Username: user.Username,
      Country: user.Country,
      Birthday: user.Birthday,
    };

    const token: string = this.generateJwt(userWithoutPass, "Secret");
    const refresh_token: string = this.generateJwt(userWithoutPass, "Refresh");
    return { tokenId: token, refresh_token: refresh_token, userId: userWithoutPass.id };
  }

  private verifyToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.SECRET_TOKEN, (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      });
    });
  }

  async isAuthenticated(token: string): Promise<boolean> {
    try {
      const decoded = await this.verifyToken(token);

      if (decoded && decoded.id) {
        const user: IUser | null = await this.userService.readById(decoded.id);
        if (user) return true;
      }
    } catch (error) {
      console.error("Error verifying token:", ErrorParser.parseError(error));
    }

    return false;
  }

  private generateJwt(user: IUser, type: string): string {
    if (type === "Secret") return jwt.sign(user, this.SECRET_TOKEN, { expiresIn: "2h" });
    return jwt.sign(user, this.REFRESH_TOKEN, { expiresIn: "3d" });
  }

  private isValidPassword(password: string, savedPassword: string): boolean {
    return bcrypt.compareSync(password, savedPassword);
  }

  private encryptPassword(password: string): string {
    return bcrypt.hashSync(password, 6);
  }

  private setUserDefault(user: IUser) {
    this.initUserLevel(user);
    user.Role = DBRoles.BASIC;
    user.RoleId = 1;
    const userPassword = user.Password!;
    user.Password = this.encryptPassword(userPassword);
    user.Points = 0;
  }

  private initUserLevel(user: IUser) {
    const levels: Level[] = Level.defaultLevels;
    user.Level = levels[0];
    user.LevelId = 1;
  }
}
