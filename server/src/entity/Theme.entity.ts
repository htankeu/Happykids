import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./Question.entity";
import { ThemeColor } from "./Theme-color.entity";
import { ITheme } from "../interfaces/Theme.interface";

@Entity()
export class Theme implements ITheme {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;
  @Column({ type: "varchar", length: 100, nullable: false })
  Theme: string;
  @Column({ type: "varchar", length: 100, nullable: true })
  Description: string;
  @Column({ type: "bigint", nullable: true })
  ThemeColorId: number;
  @OneToMany(() => Question, (question) => question.Theme)
  Questions: Question[];
  @OneToOne(() => ThemeColor)
  @JoinColumn()
  ThemeColor: ThemeColor;

  constructor(themeId: number, themeName: string, description: string = "Test") {
    this.id = themeId;
    this.Theme = themeName;
    this.Description = description;
  }
}
