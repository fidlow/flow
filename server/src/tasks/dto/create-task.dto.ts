import { TaskInterface } from '../../common/TaskInterface';
import { IsString } from 'class-validator';

export default class CreateTaskDto implements TaskInterface {
  @IsString()
  name: string;
}
