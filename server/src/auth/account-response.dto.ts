import {ResponseInterface} from "../common/ResponseInterface";
import {ApiProperty} from "@nestjs/swagger";
import {AccountEntity} from "../accounts/account.entity";

export default class AuthResponse implements ResponseInterface {

  constructor(isError: boolean, message: AccountEntity | string | null) {
    this.isError = isError;
    this.message = message;
  }

  @ApiProperty({example: false})
  isError: boolean;
  message: AccountEntity | string | null;
}
