import { IUser } from "./User.interface";

export interface IPressureCensor {
  PressureValue: string;
  time: Date;
  UserId?: number;
  User?: IUser[];
}
