import { Injectable } from '@nestjs/common';
import { ProjectOrmEntity } from './project.orm-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectEntity } from './project.entity';
import { ProjectMapper } from './project.mapper';
import CreateProjectDto from './dto/create-project.dto';
import { AccountOrmEntity } from '../accounts/account.orm-entity';
import UpdateProjectDto from './dto/update-project.dto';
import { AccountId } from '../common/AccountInterface';
import { ProjectId } from '../common/ProjectInterface';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectOrmEntity)
    private readonly _projectRepository: Repository<ProjectOrmEntity>,
    @InjectRepository(AccountOrmEntity)
    private readonly _accountRepository: Repository<AccountOrmEntity>,
  ) {}
  async readProjectsByAccount(accountId: AccountId): Promise<ProjectEntity[]> {
    const projectsOrmEntity = await this._projectRepository.find({
      relations: ['owner', 'events', 'events.manager'],
    });
    if(projectsOrmEntity)
    {
      const projectsOrmEntityByAccount = projectsOrmEntity.filter((p) =>
        p.events.some((e) => e.manager.accountId === accountId));
      return projectsOrmEntityByAccount.map(ProjectMapper.mapToDomain);
    } else
      throw new Error('NotFound')

  }
  async readAll(): Promise<ProjectEntity[]> {
    const projectsOrmEntity = await this._projectRepository.find({
      relations: ['owner'],
    });
    return projectsOrmEntity.map(ProjectMapper.mapToDomain);
  }

  async readOne(id: ProjectId): Promise<ProjectEntity> {
    const project = await this._projectRepository.findOne({
      relations: ['owner', 'events', 'events.manager', 'events.tasks'],
      where: { id },
    });
    if (project) return ProjectMapper.mapToDomain(project);
    else throw Error('NotFound');
  }

  async readOneByAccount(id: ProjectId, accountId: AccountId): Promise<ProjectEntity> {
    const projectOrmEntity = await this._projectRepository.findOne({
      relations: ['owner', 'events', 'events.manager', 'events.tasks'],
      where: { id },
    });
    const events = projectOrmEntity?.events.filter((e) => e.manager.accountId === accountId);
    if(projectOrmEntity && events && events.length !== 0) {
      projectOrmEntity.events = events;
      return ProjectMapper.mapToDomain(projectOrmEntity);
    }
    else throw Error('NotFound');
  }

  async create(
    project: CreateProjectDto,
    accountId: AccountId,
  ): Promise<ProjectId> {
    const accountOrmEntity = await this._accountRepository.findOne({
      accountId,
    });
    const newProject = ProjectMapper.mapToOrmEntity(project);
    if (accountOrmEntity) newProject.owner = accountOrmEntity;
    const newProjectFromDb = await this._projectRepository.save(newProject);
    return newProjectFromDb.id;
  }

  async update(
    id: ProjectId,
    project: UpdateProjectDto,
  ): Promise<UpdateResult> {
    const projectOrmEntity: Partial<ProjectOrmEntity> = ProjectMapper.mapToOrmEntity(
      project,
    );
    return await this._projectRepository.update(id, projectOrmEntity);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this._projectRepository.delete(id);
  }
}
