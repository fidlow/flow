import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  SerializeOptions,
  UseGuards
} from "@nestjs/common";
import JwtAuthGuard from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { ApiTags } from "@nestjs/swagger";
import { EventsService } from "./events.service";
import { EventId } from "../common/EventInterface";
import EventResponse from "./dto/event-response.dto";
import CreateEventDto from "./dto/create-event.dto";
import { ProjectId } from "../common/ProjectInterface";
import UpdateEventDto from "./dto/update-event.dto";
import RequestWithAccount from "../accounts/request-with-account.interface";
import ProjectResponse from "../projects/dto/project-response.dto";

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('event')
@Controller('event')
export class EventsController {
  constructor(private readonly _eventService: EventsService) {  }

  @SerializeOptions({groups: ['getOne']})
  @Get(':id')
  async getById(@Param('id') id: EventId): Promise<EventResponse> {
    try {
      const res = await this._eventService.readOne(id);
      if (!res) {
        return new EventResponse(true, 'NotFoundEntityError');
      }
      return new EventResponse(false, res);
    } catch (e) {
      return new EventResponse(true, e.message);
    }
  }

  @SerializeOptions({groups: ['getOne']})
  @Get('project')
  async get( @Req() req: RequestWithAccount): Promise<ProjectResponse> {
    try {
      const res = await this._eventService.readEventsByAccount(req.user.id);
      if (!res) {
        return new ProjectResponse(true, 'NotFoundEntityError');
      }
      return new ProjectResponse(false, res);
    } catch (e) {
      return new ProjectResponse(true, e.message);
    }
  }

  @Post(':projectId')
  async create(@Param('projectId') projectId: ProjectId, @Body() event: CreateEventDto) : Promise<EventResponse> {
    try {
      const newEventId = await this._eventService.create(projectId, event);
      return new EventResponse(false, newEventId);
    } catch (e) {
      return new EventResponse(true, e.message);
    }
  }

  @Put(':id')
  async update(@Param('id') id: EventId, @Body() event: UpdateEventDto): Promise<EventResponse> {
    try {
      await this._eventService.update(id, event)
      return new EventResponse(false, null);
    } catch (e) {
      return new EventResponse(true, e.message);
    }
  }
  @HttpCode(200)
  @Delete(':id')
  async delete(@Param('id') id: EventId): Promise<EventResponse> {
    try {
      const deleteResult = await this._eventService.delete(id);
      if(!deleteResult.affected) return new EventResponse(true, 'NotFound');
      return new EventResponse(false, null);
    } catch(e) {
      return new EventResponse(true, e.message);
    }
  }
}
