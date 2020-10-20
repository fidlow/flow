import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountOrmEntity } from './account.orm-entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { AccountEntity } from './account.entity';
import { AccountMapper } from './account.mapper';
import { RoleOrmEntity } from './role.orm-entity';
import RoleEntity from './role.entity';
import UpdateAccountDto from './dto/update-account.dto';
import RegisterDto from '../auth/dto/register.dto';
import { AccountId } from '../common/AccountInterface';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(AccountOrmEntity)
    private readonly _accountRepository: Repository<AccountOrmEntity>,
    @InjectRepository(RoleOrmEntity)
    private readonly _roleRepository: Repository<RoleOrmEntity>,
  ) {}
  async getByEmail(email: string): Promise<AccountEntity> {
    const account = await this._accountRepository.findOne({
      relations: ['roles'],
      where: { email },
    });
    if (account) return AccountMapper.mapAccountToDomain(account);
    else throw Error('NotFoundAccount');
  }
  async getById(accountId: string): Promise<AccountEntity> {
    const account = await this._accountRepository.findOne({
      relations: ['roles'],
      where: { accountId },
    });
    if (account) return AccountMapper.mapAccountToDomain(account);
    else throw Error('NotFoundAccount');
  }
  async readAll(): Promise<AccountEntity[]> {
    const accounts = await this._accountRepository.find();
    return accounts.map(AccountMapper.mapAccountToDomain);
  }
  async readAllWithRoles(): Promise<AccountEntity[]> {
    const accounts = await this._accountRepository.find({
      relations: ['roles'],
    });
    return accounts.map(AccountMapper.mapAccountToDomain);
  }
  async update(
    accountId: string,
    account: UpdateAccountDto,
  ): Promise<UpdateResult> {
    const accountOrmEntity = await this._accountRepository.findOne({
      accountId,
    });
    if (accountOrmEntity) {
      if (account.name) accountOrmEntity.name = account.name;
      if (account.email) accountOrmEntity.email = account.email;
      if (account.new_password)
        accountOrmEntity.password = account.new_password;
      return this._accountRepository.update(
        accountOrmEntity.id,
        accountOrmEntity,
      );
    } else {
      throw Error('NotFoundAccount');
    }
  }
  async delete(accountId: string): Promise<DeleteResult> {
    return await this._accountRepository.delete({ accountId });
  }
  async addRoleToAccount(roleId: number, accountId: string): Promise<boolean> {
    const account = await this._accountRepository.findOne({
      relations: ['roles'],
      where: { accountId },
    });
    if (account) {
      const role = await this._roleRepository.findOne({ id: roleId });
      if (role) account.roles.push(role);
      this._accountRepository.save(account);
      return true;
    } else return false;
  }

  async removeRoleFromAccount(
    roleId: number,
    accountId: string,
  ): Promise<boolean> {
    const account = await this._accountRepository.findOne({
      relations: ['roles'],
      where: { accountId },
    });
    if (account) {
      const newAccount = {
        ...account,
        roles: account.roles.filter((r) => r.id != roleId),
      };
      console.log(newAccount);
      this._accountRepository.save(newAccount);
      return true;
    } else return false;
  }
  async createRole(name: string): Promise<RoleEntity> {
    const newRole = await this._roleRepository.create({ name });
    await this._roleRepository.save(newRole);
    return AccountMapper.mapRoleToDomain(newRole);
  }
  async getAllRoles(): Promise<RoleEntity[]> {
    const roles = await this._roleRepository.find();
    return roles.map(AccountMapper.mapRoleToDomain);
  }

  async createEmployee(account: RegisterDto): Promise<AccountId> {
    const newAccount = await this._accountRepository.create(account);
    const role = await this._roleRepository.findOne({ id: 2 });
    if (role) newAccount.roles = [role];
    await this._accountRepository.save(newAccount);
    const accountEntity = AccountMapper.mapAccountToDomain(newAccount);
    return accountEntity.id;
  }
}
