import { Repository } from "typeorm";
import { Level } from "../entity/Level.entity";
import { AppDataSource } from "../../data-source";
import { CRUD } from "../models/CRUD.model";
import { ILevel } from "../interfaces/Level.interface";
import { listResult } from "../models/resultList.model";

export class LevelService implements CRUD<Level, ILevel, listResult<Level>> {
  private levelRepository: Repository<Level>;

  constructor() {
    this.levelRepository = AppDataSource.getRepository(Level);
  }
  list(take: number, page: number, filterOption?: any): Promise<listResult<Level>> {
    throw new Error("Method not implemented.");
  }
  create(resource: ILevel): Promise<Level> {
    throw new Error("Method not implemented.");
  }
  readById(id: any): Promise<Level | null> | Promise<ILevel | null> {
    return this.levelRepository.findOne({ where: { id: id } });
  }
  readByGrad(grad: any): Promise<Level | null> | Promise<ILevel | null> {
    return this.levelRepository.findOne({ where: { grad: grad } });
  }
  putById(id: any, resource: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
