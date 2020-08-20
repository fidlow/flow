import {TaskInterface} from "../commonFromServer/TaskInterface";
import {ExecutionStatus} from "../common/ExecutionStatus";

export class Task implements TaskInterface{
  endDate: Date = new Date();
  id?: string;
  manager = "";
  name = "";
  status: ExecutionStatus = ExecutionStatus.NotRunning;
  jobs?: string[];

}
