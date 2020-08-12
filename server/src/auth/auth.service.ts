import { Injectable } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import RegisterDto from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { AccountEntity } from '../accounts/account.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import TokenPayload from './interfaces/token-payload.interface';
import CreateRoleDto from '../accounts/create-role.dto';
import RoleEntity from '../accounts/role.entity';
import { UpdateResult } from "typeorm";
import UpdateAccountDto from "../accounts/update-account.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly _accountsService: AccountsService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  public async register(registrationData: RegisterDto): Promise<AccountEntity> {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
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
  public async getAllAccountsWithPermissions(): Promise<AccountEntity[]> {
    const accounts = await this._accountsService.readAllWithRoles();
    return accounts;
  }
  public async updateAccount(account: UpdateAccountDto): Promise<UpdateResult> {
    return await this._accountsService.update(account.id, account);
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
