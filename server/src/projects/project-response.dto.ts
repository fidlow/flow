import {ResponseInterface} from "../common/ResponseInterface";
import {ApiProperty} from "@nestjs/swagger";
import { ProjectEntity } from "./project.entity";

type ProjectResponseTypes = ProjectEntity | ProjectEntity[] | string | null;

export default class ProjectResponseDto implements ResponseInterface {

  constructor(isError: boolean, message: ProjectResponseTypes) {
    this.isError = isError;
    this.message = message;
  }

  @ApiProperty({example: false})
  isError: boolean;
  message: ProjectResponseTypes;
}
