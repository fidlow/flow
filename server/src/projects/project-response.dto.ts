import {ResponseInterface} from "../common/ResponseInterface";
import {ProjectOrmEntity} from "./project.orm-entity";
import {ApiProperty} from "@nestjs/swagger";

export class ProjectResponseDto implements ResponseInterface {
  @ApiProperty({example: false})
  isError: boolean;
  message: ProjectOrmEntity | boolean | string;
}
