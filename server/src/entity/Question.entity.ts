import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Proposition } from "./Proposition.entity";
import { Theme } from "./Theme.entity";
import { Quiz } from "./Quiz.entity";
import { IQuestion } from "../interfaces/Questions.interface";
import { Level } from "./Level.entity";

@Entity()
export class Question implements IQuestion {
  @PrimaryGeneratedColumn("uuid")
  id: number;
  @Column({ type: "varchar", length: 1000 })
  Question: string;
  @Column({ type: "varchar", length: 500 })
  Response: string;
  @OneToMany(() => Proposition, (proposition) => proposition.Question)
  Propositions: Proposition[];
  @Column({ type: "bigint" })
  ThemeId: number;
  @Column({ type: "bigint" })
  LevelId: number;
  @ManyToOne(() => Level, (level) => level.Questions)
  Level: Level;
  @ManyToOne(() => Theme, (theme) => theme.Questions)
  Theme: Theme;
  @ManyToMany(() => Quiz)
  @JoinTable()
  Quiz: Quiz[];
}
