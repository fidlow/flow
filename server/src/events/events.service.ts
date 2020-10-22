import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventOrmEntity } from './event.orm-entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectId } from '../common/ProjectInterface';
import { EventEntity } from './event.entity';
import { ProjectOrmEntity } from '../projects/project.orm-entity';
import { EventMapper } from './event.mapper';
import { EventId } from '../common/EventInterface';
import CreateEventDto from './dto/create-event.dto';
import UpdateEventDto from './dto/update-event.dto';
import { AccountOrmEntity } from '../accounts/account.orm-entity';
import { ProjectEntity } from "../projects/project.entity";
import { AccountId } from "../common/AccountInterface";
import { ProjectMapper } from "../projects/project.mapper";

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventOrmEntity)
    private readonly _eventRepository: Repository<EventOrmEntity>,
    @InjectRepository(ProjectOrmEntity)
    private readonly _projectRepository: Repository<ProjectOrmEntity>,
    @InjectRepository(AccountOrmEntity)
    private readonly _accountRepository: Repository<AccountOrmEntity>,
  ) {}

  async readEventsByProject(projectId: ProjectId): Promise<EventEntity[]> {
    const projectOrmEntity = await this._projectRepository.findOne(projectId);
    const eventsOrmEntity = await this._eventRepository.find({
      where: { project: projectOrmEntity },
    });
    return eventsOrmEntity.map(EventMapper.mapToDomain);
  }
  async readEventsByAccount(accountId: AccountId): Promise<ProjectEntity[]> {
    const accountOrmEntity = await this._accountRepository.findOne({accountId});
    const eventsOrmEntity = await this._eventRepository.find({manager: accountOrmEntity});
    const projectsOrmEntity = eventsOrmEntity.map(e => e.project);
    return projectsOrmEntity.map(ProjectMapper.mapToDomain);
  }

  async readOne(id: EventId): Promise<EventEntity> {
    const eventOrmEntity = await this._eventRepository.findOne({
      relations: ['manager'],
      where: { id },
    });
    if (eventOrmEntity) return EventMapper.mapToDomain(eventOrmEntity);
    else throw Error('NotFoundError');
  }

  async create(projectId: ProjectId, event: CreateEventDto): Promise<EventId> {
    const projectOrmEntity = await this._projectRepository.findOne(projectId);
    const accountOrmEntity = await this._accountRepository.findOne({
      accountId: event.manager,
    });
    const newEvent = EventMapper.mapToOrmEntity(event);
    if (projectOrmEntity) newEvent.project = projectOrmEntity;
    if (accountOrmEntity) newEvent.manager = accountOrmEntity;
    const newEventOrmEntity = await this._eventRepository.save(newEvent);
    return newEventOrmEntity.id;
  }

  async update(id: EventId, event: UpdateEventDto): Promise<UpdateResult> {
    const eventOrmEntity = EventMapper.mapToOrmEntity(event);
    return await this._eventRepository.update(id, eventOrmEntity);
  }

  async delete(id: EventId): Promise<DeleteResult> {
    return await this._eventRepository.delete(id);
  }
}
