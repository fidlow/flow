import {
  Body,
  Controller,
  Delete,
  Get, HttpCode,
  Param,
  Post,
  Put, Req, UseGuards
} from "@nestjs/common";
import { ProjectOrmEntity } from './project.orm-entity';
import { ProjectsService } from './projects.service';
import { ApiBody, ApiTags } from "@nestjs/swagger";
import ProjectResponse from './project-response.dto';
import JwtAuthGuard from "../auth/guards/jwt-auth.guard";
import RequestWithAccount from "../accounts/request-with-account.interface";
import CreateProjectDto from "./dto/create-project.dto";
import { RolesGuard } from "../auth/roles.guard";
import UpdateProjectDto from "./dto/update-project.dto";
import { Roles } from "../auth/roles.decorator";

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags("project")
@Controller('project')
export class ProjectsController {
  constructor(private readonly _projectSerivce: ProjectsService) {}

  @Get()
  async getMyProjects(@Req() req: RequestWithAccount): Promise<ProjectOrmEntity[]> {
    return await this._projectSerivce.readProjectsByAccount(req.user.id);
  }
  @Get('all')
  @Roles('admin')
  async getAllProjects(): Promise<ProjectOrmEntity[]> {
    return await this._projectSerivce.readAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ProjectResponse> {
    try {
      const res = await this._projectSerivce.readOne(id);
      if (!!res) {
        return new ProjectResponse(true,  'NotFoundEntityError');
      }
      return new ProjectResponse(false, null);
    } catch (e) {
      return new ProjectResponse(true, e.message);
    }
  }

  // @ApiBody({schema: {type: 'object',properties: {name: { example: 'Project Name' }, },},})
  @Post()
  async create(@Req() req: RequestWithAccount, @Body() project: CreateProjectDto): Promise<ProjectResponse> {
    try {
      const newProjectId = await this._projectSerivce.create(project, req.user.id);
      return new ProjectResponse(false, newProjectId);
    } catch (e) {
      return new ProjectResponse(true, e.message);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() project: UpdateProjectDto): Promise<ProjectResponse> {
    try {
      await this._projectSerivce.update(id, project);
      return new ProjectResponse(false, null);
    } catch (e) {
      return new ProjectResponse(true, e.message);
    }
  }

  @HttpCode(200)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ProjectResponse> {
    try {
      const deleteResult = await this._projectSerivce.delete(id);
      if (!deleteResult.affected) return new ProjectResponse(true,'NotFound' );
      return new ProjectResponse(false, null);
    } catch (e) {
      return new ProjectResponse(true,e.message );
    }
  }
}
