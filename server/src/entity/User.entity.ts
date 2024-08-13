import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role.entity";
import { ColorCensor } from "./Color-censor.entity";
import { PressureCensor } from "./Pressure-censor.entity";
import { Level } from "./Level.entity";
import { Result } from "./Result.entity";
import { IUser } from "../interfaces/User.interface";

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn("uuid")
  id: number;
  @Column({ type: "varchar", length: 25, select: true })
  Email: string;
  @Column({ type: "varchar", length: 25, unique: true, select: true })
  Username: string;
  @Column({ type: "varchar", length: 200, select: false })
  Password: string;
  @Column({ type: "varchar", length: 20, nullable: true })
  FirstName: string;
  @Column({ type: "varchar", length: 20, nullable: true })
  LastName: string;
  @Column({ type: "varchar", length: 20, nullable: true })
  Country: string;
  @Column({ nullable: true })
  Birthday: Date;
  @Column("bigint")
  RoleId: number;
  @ManyToOne(() => Role, (role) => role.RoleId, { nullable: false })
  @JoinColumn({ name: "RoleId" })
  Role: Role;
  @ManyToMany(() => ColorCensor)
  Colors: ColorCensor[];
  @ManyToMany(() => PressureCensor)
  PressureButtons: PressureCensor[];
  @ManyToOne(() => Level, (level) => level.User)
  Level: Level;
  @Column()
  LevelId: number;
  @Column()
  Points: number;
  @ManyToMany(() => Result)
  Results: Result[];
}
