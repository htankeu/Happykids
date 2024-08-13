import { IQuestion } from "./Questions.interface";
import { IResult } from "./Quiz-resulta.interface";

export interface IQuiz {
  id?: number;
  QuizName: string;
  WinnerValue?: number;
  Questions: IQuestion[];
  Result?: IResult;
}
