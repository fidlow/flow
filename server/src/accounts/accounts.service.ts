import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {AccountOrmEntity} from "./account.orm-entity";
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {AccountEntity} from "./account.entity";
import {AccountMapper} from "./account.mapper";
import { RoleOrmEntity } from "./role.orm-entity";
import RoleEntity from "./role.entity";
import UpdateAccountDto from "./dto/update-account.dto";
import RegisterDto from "../auth/dto/register.dto";

@Injectable()
export class AccountsService {
  constructor(@InjectRepository(AccountOrmEntity) private readonly _accountRepository: Repository<AccountOrmEntity>,
              @InjectRepository(RoleOrmEntity) private readonly _roleRepository: Repository<RoleOrmEntity>) {}
  async getByEmail(email: string): Promise<AccountEntity> {
    const account = await this._accountRepository.findOne({relations: ['roles'], where: {email}});
    return AccountMapper.mapAccountToDomain(account);
  }
  async getById(accountId: string): Promise<AccountEntity> {
    const account = await this._accountRepository.findOne({relations: ['roles'], where: {accountId}});
    return AccountMapper.mapAccountToDomain(account);
  }
  async readAll(): Promise<AccountEntity[]> {
    const accounts = await this._accountRepository.find();
    return accounts.map(AccountMapper.mapAccountToDomain);
  }
  async readAllWithRoles(): Promise<AccountEntity[]> {
    const accounts = await this._accountRepository.find({relations: ['roles']});
    return accounts.map(AccountMapper.mapAccountToDomain);
  }
  async update(accountId: string, account: UpdateAccountDto): Promise<UpdateResult> {
    const accountOrmEntity = await this._accountRepository.findOne({accountId });
    if(account.name) accountOrmEntity.name = account.name;
    if(account.email) accountOrmEntity.email = account.email;
    if(account.password) accountOrmEntity.password = account.password;
    return this._accountRepository.update(accountOrmEntity.id, accountOrmEntity);
  }
  async delete(accountId: string): Promise<DeleteResult> {
    return await this._accountRepository.delete({accountId });
  }
  async addRoleToAccount(roleId: number, accountId: string): Promise<boolean> {
    const account = await this._accountRepository.findOne({relations: ['roles'], where: {accountId}});
    const role = await this._roleRepository.findOne({id: roleId});
    account.roles.push(role);
    this._accountRepository.save(account);
    return true;
  }

  async removeRoleFromAccount(roleId: number, accountId: string): Promise<boolean> {
    const account = await this._accountRepository.findOne({relations: ['roles'], where: {accountId}});
    const newAccount = {...account, roles: account.roles.filter(r => r.id != roleId)};
    console.log(newAccount)
    this._accountRepository.save(newAccount);
    return true;
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

  async createEmployee(account: RegisterDto): Promise<AccountEntity> {
    const newAccount = await this._accountRepository.create(account);
    const role = await this._roleRepository.findOne({id: 2});
    newAccount.roles = [role];
    await this._accountRepository.save(newAccount);
    return AccountMapper.mapAccountToDomain(newAccount);
  }
  // async updateTask(account: Partial<AccountOrmEntity>): Promise<UpdateResult> {
  //   return await this._accountRepository.updateTask(account.id, account);
  // }
  // async delete(id: string): Promise<DeleteResult> {
  //   return await this._accountRepository.delete(id);
  // }

}
