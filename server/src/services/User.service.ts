import { FindOptionsWhere, Repository } from "typeorm";
import { User } from "../entity/User.entity";
import { CRUD } from "../models/CRUD.model";
import { AppDataSource } from "../../data-source";
import { IUser } from "../interfaces/User.interface";
import { listResult } from "../models/resultList.model";
import { FilterOption } from "../helper/filter-option.helper";
import { UserListFilter } from "../models/UserListFilter.model";
import findOptionHelper from "../helper/find-option.helper";
import { Level } from "../entity/Level.entity";
import { LevelService } from "./Level.service";
import { ILevel } from "../interfaces/Level.interface";

export class UserService implements CRUD<User, IUser, listResult<User>> {
  private userRepository: Repository<User>;
  private levelService: LevelService;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.levelService = new LevelService();
  }

  async list(take: number, page: number, filterOption?: any): Promise<listResult<User>> {
    const skip = (page - 1) * take;
    const filterOptionUser: FilterOption = new FilterOption();

    const userOptions: UserListFilter = filterOption as UserListFilter;
    const allFilterOptions = filterOptionUser.userFilter(userOptions);
    const whereCascade: FindOptionsWhere<User>[] = findOptionHelper.whereCondition<User>(
      allFilterOptions.filterOrArray,
      allFilterOptions.filterAndArray,
      allFilterOptions.filterRelations[0]
    );

    const [data, total] = await this.userRepository.findAndCount({
      skip: skip,
      take: take,
      relations: {
        Level: true,
        Role: true,
      },
      where: whereCascade,
    });
    const result: listResult<User> = { total, data };

    return result;
  }

  async create(resource: IUser): Promise<User> {
    return await this.userRepository.save(resource);
  }

  async readById(id: any): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id: id },
      relations: {
        Level: true,
        Role: true,
      },
    });
  }

  async readByName(name: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { Username: name },
      select: ["id", "Username", "Password", "Level"],
      relations: {
        Level: true,
        Role: true,
      },
    });
  }

  async readByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { Email: email },
      select: ["id", "Username", "Password", "Level"],
      relations: {
        Level: true,
        Role: true,
      },
    });
  }

  async putById(id: any, resource: any): Promise<boolean> {
    const user: User | null = await this.readById(id);

    if (!user) return false;

    return (await this.userRepository.update({ id: id }, resource)).affected ? true : false;
  }

  async deleteById(id: any): Promise<boolean> {
    return (await this.userRepository.delete({ id: id })).affected ? true : false;
  }

  async addLevel(id: any) {
    const user: User | null = await this.readById(id);
    if (!user) throw Error("No User");
    const userLevelid: number = Number(user.LevelId);
    const userLevel: Level | ILevel | null = await this.levelService.readById(userLevelid);
    if (!userLevel) throw Error("No Level for this user");
    const userLvelGrad: number = Number(userLevel.grad);
    const nextLevel: Level | ILevel | null = (await this.levelService.readByGrad(userLvelGrad)) as Level;
    if (!nextLevel) throw Error("No next Level");

    if (user.Points >= 1500 * userLevelid) {
      user.Points -= user.LevelId * 1500;
      user.Level = nextLevel as Level;
      user.LevelId = nextLevel.id;
      await this.userRepository.save(user);
    }
  }

  async addPoints(id: any, points: number) {
    const user: User | null = await this.readById(id);
    if (!user) throw Error("No User");
    if (!user.Points) user.Points = 0;

    user.Points += points;
    await this.userRepository.save(user);
  }
}
