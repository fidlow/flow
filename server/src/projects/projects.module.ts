import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProjectOrmEntity} from "./project.orm-entity";
import { AccountOrmEntity } from "../accounts/account.orm-entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProjectOrmEntity, AccountOrmEntity])],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
