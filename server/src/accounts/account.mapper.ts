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

  static mapRoleToOrmEntity(role: RoleEntity): RoleOrmEntity {
    const roleOrmEntity = new RoleOrmEntity();
    if(role.id) roleOrmEntity.id = role.id;
    if(role.name) roleOrmEntity.name = role.name;
    return  roleOrmEntity;
  }

  static mapAccountToOrmEntity(account: AccountEntity): AccountOrmEntity {
    const accountOrmEntity = new AccountOrmEntity();
    if(account.id) accountOrmEntity.accountId = account.id;
    if(account.name) accountOrmEntity.name = account.name;
    if(account.email) accountOrmEntity.email = account.email;
    if(account.password) accountOrmEntity.password = account.password;
    if(account.roles) {
      accountOrmEntity.roles = account.roles.map(role => this.mapRoleToOrmEntity(role));
    }
    return accountOrmEntity;
  }
}
