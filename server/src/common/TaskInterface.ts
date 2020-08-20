import { ExecutionStatus } from "./ExecutionStatus";

export interface TaskInterface {
  id?: string;
  name: string;
  endDate: Date;
  status: ExecutionStatus;
  manager: string;
  jobs?: string[];
}

