import { AccountEntity } from "./account.entity";

export default class UpdateAccountDto implements Partial<AccountEntity> {
  id: string
  email?: string;
  name?: string;
  password?: string;

}
