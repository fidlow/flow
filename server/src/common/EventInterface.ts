import { ExecutionStatus } from "./ExecutionStatus";
import { TaskInterface } from "./TaskInterface";

export interface EventInterface {
  id?: EventId;
  name: string;
  endDate: number;
  status: ExecutionStatus;
  manager: string;
  tasks?: TaskInterface[];
}
export type EventId = string;
