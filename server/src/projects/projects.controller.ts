import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { ProjectOrmEntity } from './project.orm-entity';
import { ProjectsService } from './projects.service';
import {ApiBody } from "@nestjs/swagger";
import {ProjectResponseDto} from "./project-response.dto";

export class CreateUserDto {
  email: string;
  password: string;
  isEnabled?: boolean = true;
}
@Controller('projects')
export class ProjectsController {
  constructor(private readonly _projectSerivce: ProjectsService) {}

  @Get()
  async findAll(): Promise<ProjectOrmEntity[]> {
    return await this._projectSerivce.readAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProjectResponseDto> {
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
  @Post('create')
  async create(@Body('name') name: string): Promise<ProjectResponseDto> {
    try {
      const res = await this._projectSerivce.create(name);
      return { isError: false, message: res };
    } catch (e) {
      return { isError: true, message: e.message };
    }
  }

  @Post('update')
  async update(@Body() project: ProjectOrmEntity): Promise<ProjectResponseDto> {
    try {
      const res = await this._projectSerivce.update(project);
      return { isError: false, message: res };
    } catch (e) {
      return { isError: true, message: e.message };
    }
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { example: 'uuid' },
      },
    },
  })
  @Post('delete')
  async delete(@Body('id') id: string): Promise<ProjectResponseDto> {
    try {
      const res = await this._projectSerivce.delete(id);
      return { isError: false, message: res };
    } catch (e) {
      return { isError: true, message: e.message };
    }
  }


}
