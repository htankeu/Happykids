import { Role } from "../entity/Role.entity";
import { DBROLE } from "../enum/role-enum";

export class DBRoles {
  static BASIC: Role = new Role(1, DBROLE.BASICROLE);
  static ADMIN: Role = new Role(2, DBROLE.ADMINROLE);
  static roles: Role[] = [this.BASIC, this.ADMIN];
}
