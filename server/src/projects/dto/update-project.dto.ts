import { ExecutionStatus } from '../../common/ExecutionStatus';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProjectEntity } from "../project.entity";

export default class UpdateProjectDto implements Partial<ProjectEntity>{
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsNumber()
  status?: ExecutionStatus;
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date?: Date;
}
