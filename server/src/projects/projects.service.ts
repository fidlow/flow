import { Injectable } from '@nestjs/common';
import {ProjectOrmEntity} from "./project.orm-entity";
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import { ProjectEntity } from "./project.entity";
import { ProjectMapper } from "./project.mapper";
import CreateProjectDto from "./dto/create-project.dto";
import { AccountEntity, AccountId } from "../accounts/account.entity";
import { AccountOrmEntity } from "../accounts/account.orm-entity";
import UpdateProjectDto from "./dto/update-project.dto";
import { type } from "os";

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(ProjectOrmEntity) private readonly _projectRepository: Repository<ProjectOrmEntity>,
              @InjectRepository(AccountOrmEntity) private readonly _accountRepository: Repository<AccountOrmEntity>) {
  }
  async readProjectsByAccount(accountId: AccountId): Promise<ProjectOrmEntity[]> {
    const accountOrmEntity = await this._accountRepository.findOne({accountId});
    return await this._projectRepository.find({owner: accountOrmEntity});
  }
  async readAll(): Promise<ProjectOrmEntity[]> {
    return await this._projectRepository.find();
  }

  async readOne(id: string): Promise<ProjectOrmEntity> {
      return await this._projectRepository.findOne(id);
  }

  async create(project: CreateProjectDto, accountId: AccountId): Promise<ProjectEntity> {
    const accountOrmEntity = await this._accountRepository.findOne({accountId});
    const newProject = await this._projectRepository.create({name: project.name, owner: accountOrmEntity});
    await this._projectRepository.save(newProject);
    return ProjectMapper.mapToDomain(newProject);
  }

  async update(id: string, project: UpdateProjectDto): Promise<UpdateResult> {
    const projectOrmEntity = await this._projectRepository.findOne(id);
    if(project.name) projectOrmEntity.name = project.name;
    if(project.status) projectOrmEntity.status = project.status;
    if(project.date) projectOrmEntity.date = project.date.getTime().toString();
    return await this._projectRepository.update(id, projectOrmEntity);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this._projectRepository.delete(id);
  }

}
