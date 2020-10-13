import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TaskOrmEntity } from "./task.orm-entity";
import { EventOrmEntity } from "../events/event.orm-entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([TaskOrmEntity, EventOrmEntity])],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
