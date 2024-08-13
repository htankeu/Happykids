import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./Question.entity";
import { IProposition } from "../interfaces/Proposition.interface";

@Entity()
export class Proposition implements IProposition {
  @PrimaryGeneratedColumn("uuid")
  id: number;
  @Column({ type: "varchar", length: 100 })
  Proposition: string;
  @ManyToOne(() => Question, (question) => question.Propositions)
  Question: Question;
}
