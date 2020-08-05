import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProjectOrmEntity} from "./project.orm-entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProjectOrmEntity])],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
