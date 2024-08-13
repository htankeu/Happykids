import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User.entity";
import { IPressureCensor } from "../interfaces/Pressure-censor.interface";

@Entity()
export class PressureCensor implements IPressureCensor {
  @PrimaryGeneratedColumn("uuid")
  id: number;
  @Column({ type: "varchar", length: 1 })
  PressureValue: string;
  @Column({ type: "date" })
  time: Date;
  @ManyToMany(() => User)
  @JoinTable()
  User: User[];
}
