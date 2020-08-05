import { Injectable } from '@nestjs/common';
import {ProjectOrmEntity} from "./project.orm-entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, UpdateResult} from "typeorm";

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(ProjectOrmEntity) private readonly _projectRepository: Repository<ProjectOrmEntity>) {
  }

  async readAll(): Promise<ProjectOrmEntity[]> {
    return await this._projectRepository.find();
  }

  async readOne(id: string): Promise<ProjectOrmEntity> {
      return await this._projectRepository.findOne(id);

  }

  async create(name: string): Promise<ProjectOrmEntity> {
    return await this._projectRepository.save({name});
  }

  async update(project: Partial<ProjectOrmEntity>): Promise<boolean> {
    const res = await this._projectRepository.update(project.id, project);
    return !!res;
  }

  async delete(id: string): Promise<boolean> {
    const res = await this._projectRepository.delete(id);
    return !!res;
  }

}
