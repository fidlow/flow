import { ExecutionStatus } from "../../common/ExecutionStatus";
import { ProjectEntity } from "../project.entity";
import { Type } from "class-transformer";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

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
