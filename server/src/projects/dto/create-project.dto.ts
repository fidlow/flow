import { IsDate, IsString } from "class-validator";
import { Type } from "class-transformer";

export default class CreateProjectDto {
  @IsString()
  name: string;
  @IsDate()
  @Type(() => Date)
  date: Date;
}
