import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Quiz } from "./Quiz.entity";
import { User } from "./User.entity";
import { IResult } from "../interfaces/Quiz-resulta.interface";

@Entity()
export class Result implements IResult {
  @PrimaryGeneratedColumn("uuid")
  id: number;
  @Column("uuid")
  QuizId: number;
  @ManyToOne(() => Quiz, (quiz) => quiz.Result)
  Quiz: Quiz;
  @ManyToMany(() => User)
  Winner: string | User[];
  @ManyToMany(() => User)
  Loser: string | User[];
}
