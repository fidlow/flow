import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import TokenPayload from './token-payload.interface';
import { AccountsService } from '../accounts/accounts.service';
import { AccountEntity } from '../accounts/account.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _accountService: AccountsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: _configService.get('JWT_SECRET'),
    });
  }
  async validate(payload: TokenPayload): Promise<AccountEntity> {
    return this._accountService.getById(payload.accountId);
  }
}
