import {ExecutionStatus} from "./Enums";
import {Action} from "../reducers";

export interface TaskInterface {
  id: string;
  name: string;
  endDate: Date;
  status: ExecutionStatus;
  manager: string;
  jobs?: string[];
}

export enum TaskReducer {
  Add = 'ADD',
  Update = 'UPDATE',
  Delete = 'DELETE'
}

export interface TaskReduceAction extends Action {
  type: TaskReducer;
  payload: TaskInterface;
}
