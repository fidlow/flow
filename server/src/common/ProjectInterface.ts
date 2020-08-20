import { TaskInterface } from "./TaskInterface";
import { AccountId } from "./AccountInterface";


export interface ProjectInterface {
    id?: ProjectId;
    name: string;
    date: Date;
    owner: AccountId;
    tasks?: TaskInterface[];
    // addTask(task: TaskInterface): void;
    // updateTask(task: TaskInterface): void;
    // deleteTaskById(taskId: string): void;
}

export type ProjectId = string;
