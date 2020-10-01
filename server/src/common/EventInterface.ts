import { ExecutionStatus } from "./ExecutionStatus";

export interface EventInterface {
  id?: string;
  name: string;
  endDate: Date;
  status: ExecutionStatus;
  manager: string;
  tasks?: string[];
}

