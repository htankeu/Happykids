import { IColorCensor } from "./Colour-censor.interface";
import { ILevel } from "./Level.interface";
import { IPressureCensor } from "./Pressure-censor.interface";
import { IResult } from "./Quiz-resulta.interface";
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
  Colors?: IColorCensor[];
  PressureButtons?: IPressureCensor[];
  Level?: ILevel;
  LevelId?: number;
  Points?: number;
  Results?: IResult[];
}
