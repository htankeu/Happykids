import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import indexRouter from "./src/routes/index.routes";
import { Repository } from "typeorm";
import { Level } from "./src/entity/Level.entity";
import { Role } from "./src/entity/Role.entity";
import { DBRoles } from "./src/basic-datas/basic-roles";
import { Theme } from "./src/entity/Theme.entity";
import { DBTheme } from "./src/basic-datas/basic-theme";
import cors from "cors";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 9001;

const levelRepository: Repository<Level> = AppDataSource.getRepository(Level);
const roleRepository: Repository<Role> = AppDataSource.getRepository(Role);
const themeRepository: Repository<Theme> = AppDataSource.getRepository(Theme);
const staticLevels: Level[] = Level.defaultLevels;

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

AppDataSource.initialize()
  .then(() => {
    staticLevels.forEach(async (level: Level) => {
      if (!(await levelRepository.findOne({ where: { Level: level.Level } }))) await levelRepository.save(level);
    });
    DBRoles.roles.forEach(async (role: Role) => {
      if (!(await roleRepository.findOne({ where: { RoleName: role.RoleName } }))) await roleRepository.save(role);
    });
    DBTheme.themes.forEach(async (theme: Theme) => {
      if (!(await themeRepository.findOne({ where: { Theme: theme.Theme } }))) await themeRepository.save(theme);
    });
    console.log("Data Source has been initialized");
  })
  .catch((error) => {
    console.error("Error during the initialization", error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.listen(port, () => {
  console.log(`Server is fired on: http://localhost:${port}`);
});

app.use("/", indexRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("All is working!");
});
