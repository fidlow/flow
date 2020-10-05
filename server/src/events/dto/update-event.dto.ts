import { EventEntity } from "../event.entity";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { ExecutionStatus } from "../../common/ExecutionStatus";

export default class UpdateEventDto implements Partial<EventEntity> {
  @IsOptional()
  @IsNumber()
  endDate: number;
  @IsOptional()
  @IsString()
  manager: string;
  @IsOptional()
  @IsString()
  name: string;
  @IsOptional()
  @IsNumber()
  status: ExecutionStatus;

}
