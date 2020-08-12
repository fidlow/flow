import {AccountOrmEntity} from "./account.orm-entity";
import {AccountEntity} from "./account.entity";
import { RoleOrmEntity } from "./role.orm-entity";
import RoleEntity from "./role.entity";

export class AccountMapper {
  static mapAccountToDomain(account: AccountOrmEntity): AccountEntity {
    const roles = account.roles?.map(AccountMapper.mapRoleToDomain);
    return new AccountEntity(account.accountId, account.email, account.name, account.password, roles);
  }

  static mapRoleToDomain(role: RoleOrmEntity): RoleEntity {
    return new RoleEntity(role.id, role.name);
  }
}
