import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from "@nestjs/common";
import JwtAuthGuard from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { ApiTags } from "@nestjs/swagger";
import { EventsService } from "./events.service";
import { EventId } from "../common/EventInterface";
import EventResponse from "./dto/event-response.dto";
import CreateEventDto from "./dto/create-event.dto";
import { ProjectId } from "../common/ProjectInterface";
import UpdateEventDto from "./dto/update-event.dto";

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('event')
@Controller('event')
export class EventsController {
  constructor(private readonly _eventService: EventsService) {  }

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

  @Post(':projectId')
  async create(@Param('projectId') projectId: ProjectId, @Body() event: CreateEventDto) : Promise<EventResponse> {
    try {
      const newEventId = await this._eventService.create(event,projectId);
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
