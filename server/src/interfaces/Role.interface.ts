import { IUser } from "./User.interface";

export interface IRole {
  RoleName: string;
  Users?: IUser[];
}
