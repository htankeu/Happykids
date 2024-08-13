import { IQuestion } from "./Questions.interface";
import { IUser } from "./User.interface";

export interface ILevel {
  id: number;
  Level: string;
  Description?: string;
  User?: IUser[];
  Questions: IQuestion[];
}
