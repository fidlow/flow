import { ExecutionStatus } from "../../common/ExecutionStatus";
import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { EventInterface } from "../../common/EventInterface";

export default class CreateEventDto implements EventInterface {
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
