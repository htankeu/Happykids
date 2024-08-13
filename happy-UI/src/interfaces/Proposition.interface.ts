import { IQuestion } from "./Questions.interface";

export interface IProposition {
  Proposition: string;
  Question?: IQuestion;
}
