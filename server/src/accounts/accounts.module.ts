import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AccountOrmEntity} from "./account.orm-entity";

@Module({
  imports: [TypeOrmModule.forFeature([AccountOrmEntity])],
  providers: [AccountsService],
  exports: [AccountsService]
})
export class AccountsModule {}
