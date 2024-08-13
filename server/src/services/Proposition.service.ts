import { Repository } from "typeorm";
import { Proposition } from "../entity/Proposition.entity";
import { Question } from "../entity/Question.entity";
import { IProposition } from "../interfaces/Proposition.interface";
import { CRUD } from "../models/CRUD.model";
import { listResult } from "../models/resultList.model";
import { AppDataSource } from "../../data-source";

export class PropositionService implements CRUD<Proposition, IProposition, listResult<Question>> {
  private propositionRepository: Repository<Proposition>;

  constructor() {
    this.propositionRepository = AppDataSource.getRepository(Proposition);
  }

  list(take: number, page: number, filterOption?: any): Promise<listResult<Question>> {
    throw new Error("Method not implemented.");
  }

  async create(resource: IProposition): Promise<Proposition> {
    return await this.propositionRepository.save(resource);
  }

  async readById(id: any): Promise<Proposition | IProposition | null> {
    return await this.propositionRepository.findOne({ where: { id: id } });
  }

  putById(id: any, resource: any): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async deleteById(id: any): Promise<boolean> {
    return (await this.propositionRepository.delete({ id: id })) ? true : false;
  }
}
