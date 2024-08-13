import { Repository } from "typeorm";
import { Role } from "../entity/Role.entity";
import { IRole } from "../interfaces/Role.interface";
import { CRUD } from "../models/CRUD.model";
import { listResult } from "../models/resultList.model";
import { AppDataSource } from "../../data-source";

export class RoleService implements CRUD<Role, IRole, listResult<Role>> {
  private roleRepository: Repository<Role>;

  constructor() {
    this.roleRepository = AppDataSource.getRepository(Role);
  }

  async list(take: number, page: number, filterOption?: any): Promise<listResult<Role>> {
    const skip = (page - 1) * take;
    const [data, total] = await this.roleRepository.findAndCount({
      skip: skip,
    });

    const result: listResult<Role> = { total, data };

    return result;
  }
  create(resource: IRole): Promise<Role> {
    return this.roleRepository.save(resource);
  }
  readById(id: any): Promise<Role | null> | Promise<IRole | null> {
    return this.roleRepository.findOne({ where: { RoleId: id } });
  }
  async putById(id: any, resource: any): Promise<boolean> {
    const role: IRole | null = (await this.readById(id)) as IRole;
    if (!role) throw Error("No Role with this ID could be updated");

    return (await this.roleRepository.update(id, resource)).affected ? true : false;
  }
  async deleteById(id: any): Promise<boolean> {
    const role: Role | null = (await this.readById(id)) as Role;
    if (!role) throw Error("No Role with this ID could be updated");
    
    await this.roleRepository.remove(role);
    return true;
  }
}
