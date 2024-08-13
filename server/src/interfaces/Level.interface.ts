import { IQuestion } from "./Questions.interface";
import { IUser } from "./User.interface";

export interface ILevel {
  id: number;
  Level: string;
  Description?: string;
  grad?: number;
  User?: IUser[];
  Questions: IQuestion[];
}
