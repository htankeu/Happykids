import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";
import { ILevel } from "../interfaces/Level.interface";
import { Question } from "./Question.entity";
import { OLEVEL } from "../enum/level.enum";

@Entity()
export class Level implements ILevel {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;
  @Column({ type: "varchar", length: 50 })
  Level: string;
  @Column({ type: "bigint", nullable: false })
  grad: number;
  @Column({ type: "varchar", length: 50, nullable: true })
  Description: string;
  @OneToMany(() => User, (user) => user.Level)
  User: User[];
  @OneToMany(() => Question, (question) => question.id)
  Questions: Question[];

  constructor(level: string, description: string, id: number, grad: number) {
    this.Level = level;
    this.Description = description;
    this.id = id;
    this.grad = grad;
  }

  static defaultLevels: Level[] = [
    new Level(OLEVEL.KID, "That is a basic level of the game", 1, 1),
    new Level(OLEVEL.BEGIN, "That is a Beginned level of the game", 2, 2),
    new Level(OLEVEL.INTER, "That is a Intermediare level of the game", 3, 3),
    new Level(OLEVEL.ADVANCE, "That is a Advanced level of the game", 4, 4),
    new Level(OLEVEL.PRO, "That is a Pro level of the game", 5, 5),
    new Level(OLEVEL.BOSS, "That is a Boss level of the game", 6, 6),
  ];
}
