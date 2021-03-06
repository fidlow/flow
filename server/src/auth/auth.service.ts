import { Injectable } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import RegisterDto from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { AccountEntity } from '../accounts/account.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import TokenPayload from './interfaces/token-payload.interface';
import CreateRoleDto from '../accounts/dto/create-role.dto';
import RoleEntity from '../accounts/role.entity';
import { DeleteResult, UpdateResult } from "typeorm";
import UpdateAccountDto from "../accounts/dto/update-account.dto";
import { AccountId } from "../common/AccountInterface";

@Injectable()
export class AuthService {
  constructor(
    private readonly _accountsService: AccountsService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  private static async getHashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
  public async register(registrationData: RegisterDto): Promise<AccountId> {
    const hashedPassword = await AuthService.getHashedPassword(registrationData.password);
    return await this._accountsService.createEmployee({
      ...registrationData,
      password: hashedPassword,
    });
  }
  public async getAuthenticatedAccount(
    email: string,
    plainTextPassword: string,
  ): Promise<AccountEntity> {
    const account = await this._accountsService.getByEmail(email);
    if (!account) throw new Error('PassowrdIncorrect');
    const isPasswordMatching = await AuthService.verifyPassword(plainTextPassword,account.password);
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
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }
  public getCookieForLogOut(): string {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
  public async getAllAccounts(): Promise<AccountEntity[]> {
    return await this._accountsService.readAll();
  }
  public async getAllAccountsWithRoles(): Promise<AccountEntity[]> {
    return await this._accountsService.readAllWithRoles();
  }
  public async updateAccount(accountId: string, account: UpdateAccountDto): Promise<UpdateResult> {
    const accountEntity = await this._accountsService.getById(accountId);
    const isValidPassword = await AuthService.verifyPassword(account.old_password, accountEntity.password);
    if(isValidPassword) {
      if(account.new_password) account.new_password = await AuthService.getHashedPassword(account.new_password);
      return await this._accountsService.update(accountId, account);
    } else {
      throw Error('PasswordWrong');
    }

  }
  public async deleteAccount(accountId: string): Promise<DeleteResult> {
    return await this._accountsService.delete(accountId);
  }

  public async createRole(role: CreateRoleDto): Promise<RoleEntity> {
    return await this._accountsService.createRole(role.name);
  }
  public async getAllRoles(): Promise<RoleEntity[]> {
    return await this._accountsService.getAllRoles();
  }
  public async addRoleToAccount(
    roleId: number,
    accountId: string,
  ): Promise<boolean> {
    return await this._accountsService.addRoleToAccount(roleId, accountId);
  }
  public async removeRoleFromAccount(
    roleId: number,
    accountId: string,
  ): Promise<boolean> {
    return await this._accountsService.removeRoleFromAccount(roleId, accountId);
  }
}
