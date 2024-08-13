import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Theme } from "./Theme.entity";
import { IThemeColor } from "../interfaces/Theme-color.interface";

@Entity()
export class ThemeColor implements IThemeColor {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;
  @Column({ type: "varchar", length: 9 })
  Color: string;
  @Column({ type: "bigint" })
  ThemeId: number;
  @OneToOne(() => Theme)
  @JoinColumn()
  Theme: Theme;
}
