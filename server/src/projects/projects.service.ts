import { Injectable } from '@nestjs/common';
import {ProjectOrmEntity} from "./project.orm-entity";
import {InjectRepository} from "@nestjs/typeorm";
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import { ProjectEntity} from "./project.entity";
import { ProjectMapper } from "./project.mapper";
import CreateProjectDto from "./dto/create-project.dto";
import { AccountEntity} from "../accounts/account.entity";
import { AccountOrmEntity } from "../accounts/account.orm-entity";
import UpdateProjectDto from "./dto/update-project.dto";
import { type } from "os";
import { AccountId } from "../common/AccountInterface";
import { ProjectId } from "../common/ProjectInterface";

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

  async create(project: CreateProjectDto, accountId: AccountId): Promise<ProjectId> {
    const accountOrmEntity = await this._accountRepository.findOne({accountId});
    const newProject = ProjectMapper.mapToOrmEntity(project);
    newProject.owner = accountOrmEntity;
    const newProjectFromDb = await this._projectRepository.save(newProject);
    return newProjectFromDb.id;
  }

  async update(id: string, project: UpdateProjectDto): Promise<UpdateResult> {
    const updateProject: Partial<ProjectOrmEntity> = ProjectMapper.mapToOrmEntity(project);
    return await this._projectRepository.update(id, updateProject);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this._projectRepository.delete(id);
  }

}
