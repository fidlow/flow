import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AccountEntity} from "../accounts/account.entity";
import RoleEntity from "../accounts/role.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _authService: AuthService) {
    super({usernameField: 'email'});
  }
  async validate(email: string, password: string): Promise<AccountEntity> {
    try {
      return await this._authService.getAuthenticatedAccount(email,password);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
