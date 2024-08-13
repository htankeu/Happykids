import { IQuiz } from "./Quiz.interface";
import { IUser } from "./User.interface";

export interface IResult {
  QuizId: number;
  Quiz?: IQuiz;
  Winner: IUser[] | string;
  UserId?: number;
  Loser: IUser[] | string;
}
