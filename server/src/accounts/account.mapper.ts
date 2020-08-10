import {AccountOrmEntity} from "./account.orm-entity";
import {AccountEntity} from "./account.entity";

export class AccountMapper {
  static mapToDomain(account: AccountOrmEntity): AccountEntity {
    return new AccountEntity(account.accountId, account.email, account.name, account.password);
  }
}
