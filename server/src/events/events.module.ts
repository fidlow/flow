import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventOrmEntity } from "./event.orm-entity";
import { ProjectOrmEntity } from "../projects/project.orm-entity";
import { AccountOrmEntity } from "../accounts/account.orm-entity";

@Module({
  imports:[TypeOrmModule.forFeature([EventOrmEntity, ProjectOrmEntity, AccountOrmEntity])],
  providers: [EventsService],
  controllers: [EventsController]
})
export class EventsModule {}
