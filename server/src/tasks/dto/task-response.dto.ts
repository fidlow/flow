import { ResponseInterface } from '../../common/ResponseInterface';
import { TaskEntity } from '../task.entity';
import { ApiProperty } from "@nestjs/swagger";

type TaskResponseTypes = TaskEntity | TaskEntity[] | string | null;

class TaskResponse implements ResponseInterface {
  @ApiProperty({example: false})
  isError: boolean;
  message: TaskResponseTypes;

  constructor(isError: boolean, message: TaskResponseTypes) {
    this.isError = isError;
    this.message = message;
  }
}

export default TaskResponse;
