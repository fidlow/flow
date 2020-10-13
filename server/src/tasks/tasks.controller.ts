import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import JwtAuthGuard from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { EventId } from '../common/EventInterface';
import TaskResponse from './dto/task-response.dto';
import CreateTaskDto from './dto/create-task.dto';
import { TaskId } from '../common/TaskInterface';
import UpdateTaskDto from './dto/update-task.dto.';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('task')
@Controller('task')
export class TasksController {
  constructor(private readonly _taskService: TasksService) {}

  @Get(':eventId')
  async getByEventId(
    @Param('eventId') eventId: EventId,
  ): Promise<TaskResponse> {
    try {
      const res = await this._taskService.readByEvent(eventId);
      if (!res) {
        return new TaskResponse(true, 'NotFoundEntityError');
      }
      return new TaskResponse(false, res);
    } catch (e) {
      return new TaskResponse(true, e.message);
    }
  }
  @Post(':eventId')
  async create(
    @Param('eventId') eventId: EventId,
    @Body() task: CreateTaskDto,
  ): Promise<TaskResponse> {
    try {
      const newTaskId = await this._taskService.create(eventId, task);
      return new TaskResponse(false, newTaskId);
    } catch (e) {
      return new TaskResponse(true, e.message);
    }
  }
  @Put(':id')
  async update(
    @Param('id') id: TaskId,
    @Body() task: UpdateTaskDto,
  ): Promise<TaskResponse> {
    try {
      await this._taskService.update(id, task);
      return new TaskResponse(false, null);
    } catch (e) {
      return new TaskResponse(true, e.message);
    }
  }
  @HttpCode(200)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<TaskResponse> {
    try {
      const deleteResult = await this._taskService.delete(id);
      if (!deleteResult.affected) return new TaskResponse(true, 'NotFound');
      return new TaskResponse(false, null);
    } catch (e) {
      return new TaskResponse(true, e.message);
    }
  }
}
