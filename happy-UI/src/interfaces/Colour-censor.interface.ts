import { IUser } from "./User.interface";

export interface IColorCensor {
  ColorName: string;
  time:Date,
  UserId?:number,
  User?:IUser
}
