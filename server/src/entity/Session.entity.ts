import { Column, Entity, Generated, PrimaryColumn } from "typeorm";
import { ISession } from "../interfaces/Session.interface";

@Entity()
export class Session implements ISession {
  @Generated("increment")
  @PrimaryColumn("bigint")
  Id: bigint;
  @Column("varchar")
  UserId: string;
  @Column({ type: "varchar", length: 36 })
  SessionId: string;
  @Column({ type: "varchar", length: 36 })
  TokenId: string;
  @Column({ type: "date" })
  CreatedAt: string;
}
