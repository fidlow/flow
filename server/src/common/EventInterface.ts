import { ExecutionStatus } from "./ExecutionStatus";

export interface EventInterface {
  id?: EventId;
  name: string;
  endDate: number;
  status: ExecutionStatus;
  manager: string;
  tasks?: string[];
}
export type EventId = string;
