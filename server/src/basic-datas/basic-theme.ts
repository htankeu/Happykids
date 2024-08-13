import { Theme } from "../entity/Theme.entity";
import { OTHEME } from "../enum/theme-enum";

export class DBTheme {
  private static firstTheme = new Theme(1, OTHEME.BLUE);
  private static secondTheme = new Theme(2, OTHEME.GREEN);
  private static thirdTheme = new Theme(3, OTHEME.RED);
  private static fourthTheme = new Theme(4, OTHEME.YELLOW);
  static themes: Theme[] = [this.firstTheme, this.secondTheme, this.thirdTheme, this.fourthTheme];
}
