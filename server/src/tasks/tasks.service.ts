import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskOrmEntity } from './task.orm-entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { EventId } from '../common/EventInterface';
import { TaskEntity } from './task.entity';
import { TaskMapper } from './task.mapper';
import { EventOrmEntity } from '../events/event.orm-entity';
import CreateTaskDto from './dto/create-task.dto';
import { TaskId } from '../common/TaskInterface';
import UpdateTaskDto from './dto/update-task.dto.';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskOrmEntity)
    private readonly _taskRepository: Repository<TaskOrmEntity>,
    @InjectRepository(EventOrmEntity)
    private readonly _eventRepository: Repository<EventOrmEntity>,
  ) {}

  async readByEvent(eventId: EventId): Promise<TaskEntity[]> {
    const eventOrmEntity = await this._eventRepository.findOne(eventId);
    const tasksOrmEntity = await this._taskRepository.find({
      event: eventOrmEntity,
    });
    return tasksOrmEntity.map(TaskMapper.mapToDomain);
  }

  async create(eventId: EventId, task: CreateTaskDto,): Promise<TaskId> {
    const eventOrmEntity = await this._eventRepository.findOne(eventId);
    const newTask = TaskMapper.mapToOrmEntity(task);
    if (eventOrmEntity) newTask.event = eventOrmEntity;
    const newTaskOrmEntity = await this._taskRepository.save(newTask);
    return newTaskOrmEntity.id;
  }
  async update(id: TaskId, task: UpdateTaskDto): Promise<UpdateResult> {
    const taskOrmEntity = TaskMapper.mapToOrmEntity(task);
    return await this._taskRepository.update(id, taskOrmEntity);
  }
  async delete(id: TaskId): Promise<DeleteResult> {
    return await this._taskRepository.delete(id);
  }
}
