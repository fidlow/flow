import { AccountEntity } from "../account.entity";

export default class UpdateAccountDto implements Partial<AccountEntity> {
  email?: string;
  name?: string;
  password?: string;

}
