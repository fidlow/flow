import {AccountEntity} from "./account.entity";

class CreateAccountDto implements Partial<AccountEntity>{
  email: string;
  password: string;
}

export default CreateAccountDto;
