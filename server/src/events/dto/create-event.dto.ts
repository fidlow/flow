import { ExecutionStatus } from "../../common/ExecutionStatus";
import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export default class CreateEventDto {
  @IsNumber()
  endDate: number;
  @IsString()
  manager: string;
  @IsString()
  name: string;
  @IsNumber()
  @ApiProperty({example: 0})
  status: ExecutionStatus;
}
