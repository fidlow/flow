import { ExecutionStatus } from '../../common/ExecutionStatus';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ProjectEntity } from "../project.entity";

export default class UpdateProjectDto implements Partial<ProjectEntity>{
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsNumber()
  status?: ExecutionStatus;
  @IsOptional()
  @IsNumber()
  date?: number;
}
