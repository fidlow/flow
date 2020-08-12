import {ResponseInterface} from "../common/ResponseInterface";
import {ApiProperty} from "@nestjs/swagger";
import {AccountEntity} from "../accounts/account.entity";
import RoleEntity from "../accounts/role.entity";

type AuthResponseTypes = AccountEntity | AccountEntity[] | RoleEntity | RoleEntity[] | string | null;

export default class AuthResponse implements ResponseInterface {

  constructor(isError: boolean, message: AuthResponseTypes) {
    this.isError = isError;
    this.message = message;
  }

  @ApiProperty({example: false})
  isError: boolean;
  message: AuthResponseTypes;
}
