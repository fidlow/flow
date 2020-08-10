import { Injectable } from '@nestjs/common';
import {ProjectOrmEntity} from "./project.orm-entity";
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository, UpdateResult} from "typeorm";

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
    const newProject = await this._projectRepository.create({name});
    return await this._projectRepository.save(newProject);
  }

  async update(id: string, project: Partial<ProjectOrmEntity>): Promise<UpdateResult> {
    return await this._projectRepository.update(id, project);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this._projectRepository.delete(id);
  }

}
