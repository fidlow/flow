import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, UseGuards
} from "@nestjs/common";
import { ProjectOrmEntity } from './project.orm-entity';
import { ProjectsService } from './projects.service';
import { ApiBody, ApiTags } from "@nestjs/swagger";
import ProjectResponse from './project-response.dto';
import JwtAuthGuard from "../auth/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@ApiTags("projects")
@Controller('projects')
export class ProjectsController {
  constructor(private readonly _projectSerivce: ProjectsService) {}

  @Get()
  async getAll(): Promise<ProjectOrmEntity[]> {
    return await this._projectSerivce.readAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ProjectResponse> {
    try {
      const res = await this._projectSerivce.readOne(id);
      if (!!res) {
        return { isError: true, message: 'NotFoundEntityError' };
      }
      return { isError: false, message: res };
    } catch (e) {
      return { isError: true, message: e.message };
    }
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { example: 'Project Name' },
      },
    },
  })
  @Post()
  async create(@Body('name') name: string): Promise<ProjectResponse> {
    try {
      const res = await this._projectSerivce.create(name);
      return { isError: false, message: res };
    } catch (e) {
      return { isError: true, message: e.message };
    }
  }

  @Put()
  async update(@Body() project: ProjectOrmEntity): Promise<ProjectResponse> {
    try {
      await this._projectSerivce.update(project.id, project);
      return { isError: false, message: null };
    } catch (e) {
      return { isError: true, message: e.message };
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ProjectResponse> {
    try {
      const deleteResult = await this._projectSerivce.delete(id);
      if (!deleteResult.affected) return { isError: true, message: 'NotFound' };
      return { isError: false, message: null };
    } catch (e) {
      return { isError: true, message: e.message };
    }
  }
}
