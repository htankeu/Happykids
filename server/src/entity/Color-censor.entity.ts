import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User.entity";
import { IColorCensor } from "../interfaces/Colour-censor.interface";

@Entity()
export class ColorCensor implements IColorCensor {
  @PrimaryGeneratedColumn("uuid")
  id: number;
  @Column({ type: "varchar", length: 8 })
  ColorName: string;
  @Column({ type: "date" })
  time: Date;
  @Column({ type: "uuid" })
  UserId: number;
  @ManyToMany(() => User)
  @JoinTable()
  User: User;
}
