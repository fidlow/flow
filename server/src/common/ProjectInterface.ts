import { ExecutionStatus } from "./ExecutionStatus";
import { TaskInterface } from "./TaskInterface";
import { AccountInterface } from "./AccountInterface";

export interface ProjectInterface {
    id: string;
    name: string;
    date: Date;
    status: ExecutionStatus;
    owner: AccountInterface;
    tasks?: TaskInterface[];
    // addTask(task: TaskInterface): void;
    // updateTask(task: TaskInterface): void;
    // deleteTaskById(taskId: string): void;
}

