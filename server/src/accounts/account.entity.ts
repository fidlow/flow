import { Expose} from 'class-transformer';
export type AccountId = string;

export class AccountEntity {

  constructor(
    private readonly _id: AccountId,
    private readonly _email: string,
    private readonly _name: string,
    private readonly _password: string,
  ) {  }
  @Expose()
  get id(): AccountId {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get name(): string {
    return this._name;
  }

  public getPassword(): string {
    return this._password;
  }


}
