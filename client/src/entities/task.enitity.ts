import {generateId} from "../components/common/utils";
import {TaskInterface} from "../common/TaskInterface";
import {ExecutionStatus} from "../common/Enums";

export class Task implements TaskInterface{
  endDate: Date = new Date();
  id: string = generateId();
  manager = "";
  name = "";
  status: ExecutionStatus = ExecutionStatus.NotRunning;
  jobs?: string[];
}
