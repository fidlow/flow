import {ExecutionStatus} from "../common/ExecutionStatus";
import {Task} from "./task.enitity";
import { AccountId } from "../commonFromServer/AccountInterface";
import { ProjectInterface } from "../commonFromServer/ProjectInterface";

export class Project implements ProjectInterface {
  date: Date;
  id?: string;
  name: string;
  owner: AccountId;
  tasks?: Task[];

  constructor(owner: AccountId, name = "", date: Date = new Date()) {
    this.name = name;
    this.date = date;
    this.owner = owner;
  }

  get status(): ExecutionStatus {
    if(this.tasks && this.tasks.length > 0) {
      const statuses = this.tasks.map((t) => t.status);
      if(statuses.indexOf(ExecutionStatus.Aborted) !== -1)
        return ExecutionStatus.Aborted;
      if(statuses.indexOf(ExecutionStatus.Processing) !== -1)
        return ExecutionStatus.Processing;
      if(statuses.indexOf(ExecutionStatus.NotRunning) !== -1)
        return ExecutionStatus.NotRunning;
      if(statuses.indexOf(ExecutionStatus.Finished) !== -1)
        return ExecutionStatus.Finished;
      return ExecutionStatus.Error;
    }
    return ExecutionStatus.NotRunning;
  }
  addTask(task: Task): void {
    if(!this.tasks) this.tasks = new Array<Task>();
    this.tasks.push(task);
  }
  updateTask(task: Task): void {
    if(!this.tasks) throw new Error("No tasks");
    const indexTask = this.tasks?.findIndex((p) => p.id === task.id);
    if(indexTask !== undefined && indexTask !== -1 ) {
      this.tasks[indexTask] = task;
    }
  }
  deleteTaskById(taskId: string): void {
    if(!this.tasks) throw new Error("No tasks");
    this.tasks =  this.tasks?.filter((t) => t.id !== taskId);
  }
}
