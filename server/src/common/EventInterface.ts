import { ExecutionStatus } from "./ExecutionStatus";

export interface EventInterface {
  id?: EventId;
  name: string;
  endDate: Date;
  status: ExecutionStatus;
  manager: string;
  tasks?: string[];
}
export type EventId = string;
