import {ResponseInterface} from "../common/ResponseInterface";
import {ProjectOrmEntity} from "./project.orm-entity";
import {ApiProperty} from "@nestjs/swagger";

export default class ProjectResponseDto implements ResponseInterface {
  @ApiProperty({example: false})
  isError: boolean;
  message: ProjectOrmEntity | string | null;
}
