import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {AccountOrmEntity} from "./account.orm-entity";
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import CreateAccountDto from "./create-account.dto";
import {AccountEntity} from "./account.entity";
import {AccountMapper} from "./account.mapper";

@Injectable()
export class AccountsService {
  constructor(@InjectRepository(AccountOrmEntity) private readonly _accountRepository: Repository<AccountOrmEntity>) {}
  async getByEmail(email: string): Promise<AccountEntity> {
    const account = await this._accountRepository.findOne({email});
    return AccountMapper.mapToDomain(account);
  }
  async getById(accountId: string): Promise<AccountEntity> {
    const account = await this._accountRepository.findOne({accountId});
    return AccountMapper.mapToDomain(account);
  }
  // async readOne(id: string): Promise<AccountOrmEntity> {
  //   return await this._accountRepository.findOne(id);
  // }
  // async readAll(): Promise<AccountOrmEntity[]> {
  //   return await this._accountRepository.find();
  // }
  async create(account: CreateAccountDto): Promise<AccountEntity> {
    const newAccount = await this._accountRepository.create(account);
    await this._accountRepository.save(newAccount);
    return AccountMapper.mapToDomain(newAccount);
  }
  // async update(account: Partial<AccountOrmEntity>): Promise<UpdateResult> {
  //   return await this._accountRepository.update(account.id, account);
  // }
  // async delete(id: string): Promise<DeleteResult> {
  //   return await this._accountRepository.delete(id);
  // }

}
