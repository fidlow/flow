import { Injectable } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import RegisterDto from './register.dto';
import * as bcrypt from 'bcrypt';
import { AccountEntity } from '../accounts/account.entity';
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import TokenPayload from "./token-payload.interface";

@Injectable()
export class AuthService {
  constructor(
    private readonly _accountsService: AccountsService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  public async register(registrationData: RegisterDto): Promise<AccountEntity> {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    return await this._accountsService.create({
      ...registrationData,
      password: hashedPassword,
    });
  }
  public async getAuthenticatedAccount(
    email: string,
    plainTextPassword: string,
  ): Promise<AccountEntity> {
    const account = await this._accountsService.getByEmail(email);
    const isPasswordMatching = await AuthService.verifyPassword(
      plainTextPassword,
      account.getPassword(),
    );
    if (!isPasswordMatching) throw new Error('PassowrdIncorrect');
    return account;
  }
  private static async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }
  public getCookieWithJwtToken(accountId: string): string {
    const payload: TokenPayload = { accountId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
  }
  public getCookieForLogOut(): string {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
