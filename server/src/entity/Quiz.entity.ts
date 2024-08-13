import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./Question.entity";
import { Result } from "./Result.entity";
import { IQuiz } from "../interfaces/Quiz.interface";

@Entity()
export class Quiz implements IQuiz {
  @PrimaryGeneratedColumn("uuid")
  id: number;
  @Column({ type: "varchar", length: 15 })
  QuizName: string;
  @Column({ nullable: true })
  WinnerValue: number;
  @ManyToMany(() => Question)
  @JoinTable()
  Questions: Question[];
  @OneToMany(() => Result, (result) => result.Quiz)
  Result: Result;
}
