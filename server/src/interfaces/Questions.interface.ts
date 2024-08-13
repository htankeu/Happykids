import { ILevel } from "./Level.interface";
import { IProposition } from "./Proposition.interface";
import { IQuiz } from "./Quiz.interface";
import { ITheme } from "./Theme.interface";

export interface IQuestion {
  id?: number;
  Question: string;
  Response: string;
  Propositions?: IProposition[];
  ThemeId: number;
  Theme: ITheme;
  LevelId: number;
  Level?: ILevel;
  Quiz?: IQuiz[];
}
