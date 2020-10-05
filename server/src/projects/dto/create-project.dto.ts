import { IsNumber, IsString } from "class-validator";
export default class CreateProjectDto {
  @IsString()
  name: string;
  @IsNumber()
  date: number;
}
