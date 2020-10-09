import { IsNumber, IsString } from "class-validator";
import { ProjectEntity } from "../project.entity";
export default class CreateProjectDto implements Partial<ProjectEntity> {
  @IsString()
  name: string;
  @IsNumber()
  createdDate: number;
}
