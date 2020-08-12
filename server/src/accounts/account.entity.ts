import { Expose} from 'class-transformer';
import RoleEntity from "./role.entity";
export type AccountId = string;

export class AccountEntity {

  // private readonly _permissions;

  constructor(
    private readonly _id: AccountId,
    private readonly _email: string,
    private readonly _name: string,
    private readonly _password: string,
    private readonly _roles: RoleEntity[],
  ) {  }
  @Expose()
  get id(): AccountId {
    return this._id;
  }
  @Expose({groups: ["get"]})
  get email(): string {
    return this._email;
  }
  @Expose({groups: ["get"]})
  get name(): string {
    return this._name;
  }

  @Expose()
  get roles(): RoleEntity[] {
    return this._roles;
  }

  get password(): string {
    return this._password;
  }


}
