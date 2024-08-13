import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "./src/entity/User.entity";
import { Theme } from "./src/entity/Theme.entity";
import { Role } from "./src/entity/Role.entity";
import { ThemeColor } from "./src/entity/Theme-color.entity";
import { Result } from "./src/entity/Result.entity";
import { Quiz } from "./src/entity/Quiz.entity";
import { Question } from "./src/entity/Question.entity";
import { Proposition } from "./src/entity/Proposition.entity";
import { PressureCensor } from "./src/entity/Pressure-censor.entity";
import { Level } from "./src/entity/Level.entity";
import { ColorCensor } from "./src/entity/Color-censor.entity";

dotenv.config();

const host: string = process.env.DB_HOST ?? "";
const username: string = process.env.DB_USER ?? "";
const password: string = process.env.DB_PASSWORD ?? "";
const database: string = process.env.DB_DATABASE ?? "";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: host,
  port: Number(process.env.DB_PORT ?? 5432),
  username: username,
  password: password,
  database: database,
  synchronize: true,
  logging: true,
  entities: [
    User,
    Theme,
    Role,
    ThemeColor,
    Result,
    Quiz,
    Question,
    Proposition,
    PressureCensor,
    Level,
    ColorCensor,
  ],
  subscribers: [],
  migrations: [],
});
