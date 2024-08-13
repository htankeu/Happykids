import { ILevel } from "./Level.interface";
import { IRole } from "./Role.interface";

export interface IUser {
  id: number;
  Email: string;
  FirstName: string;
  LastName: string;
  Username: string;
  Country: string;
  Birthday: Date;
  Password?: string;
  RoleId?: number;
  Role?: IRole;
  Level?: ILevel;
  LevelId?: number;
  Points?: number;
}
