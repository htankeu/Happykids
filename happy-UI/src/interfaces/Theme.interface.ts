import { IQuestion } from "./Questions.interface";
import { IThemeColor } from "./Theme-color.interface";

export interface ITheme {
  id: number;
  Theme: string;
  Description: string;
  Questions: IQuestion[];
  ThemeColorId?: number;
  ThemeColor?: IThemeColor;
}
