import { Column, Entity, Generated, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "./User.entity";
import { IRole } from "../interfaces/Role.interface";
import { numberTransformer } from "../helper/type-transformer.helper";

@Entity()
export class Role implements IRole {
  @Generated("increment")
  @PrimaryColumn({ type: "bigint", transformer: [numberTransformer] })
  RoleId: number;
  @Column({ type: "varchar", length: 15 })
  RoleName: string;
  @OneToMany(() => User, (user) => user.RoleId)
  Users: User[];

  constructor(roleId: number, rolename: string) {
    this.RoleId = roleId;
    this.RoleName = rolename;
  }
}
