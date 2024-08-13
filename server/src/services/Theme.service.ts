import { Repository } from "typeorm";
import { Theme } from "../entity/Theme.entity";
import { ITheme } from "../interfaces/Theme.interface";
import { CRUD } from "../models/CRUD.model";
import { listResult } from "../models/resultList.model";
import { AppDataSource } from "../../data-source";

export class ThemeService implements CRUD<Theme, ITheme, listResult<Theme>> {
  private themeRepository: Repository<Theme>;

  constructor() {
    this.themeRepository = AppDataSource.getRepository(Theme);
  }

  async list(take: number, page: number, filterOption?: any): Promise<listResult<Theme>> {
    const [data, total] = await this.themeRepository.findAndCount({});
    const result: listResult<Theme> = { total, data };

    return result;
  }
  create(resource: ITheme): Promise<Theme> {
    throw new Error("Method not implemented.");
  }
  readById(id: any): Promise<Theme | null> | Promise<ITheme | null> {
    throw new Error("Method not implemented.");
  }
  putById(id: any, resource: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
