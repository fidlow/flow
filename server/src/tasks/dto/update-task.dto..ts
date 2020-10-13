import { TaskEntity } from "../task.entity";
import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export default class UpdateTaskDto implements Partial<TaskEntity> {
  @IsOptional()
  @IsString()
  @ApiProperty()
  name: string;
}
