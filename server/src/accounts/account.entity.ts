import { Expose } from "class-transformer";
import RoleEntity from "./role.entity";
import { AccountId, AccountInterface } from "../common/AccountInterface";

export class AccountEntity implements AccountInterface {

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
  @Expose({groups: ["get","getManager"]})
  get name(): string {
    return this._name;
  }

  @Expose({groups: ["get"]})
  get roles(): RoleEntity[] {
    return this._roles;
  }

  get password(): string {
    return this._password;
  }


}
