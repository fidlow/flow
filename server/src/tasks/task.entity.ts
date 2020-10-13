import { TaskId, TaskInterface } from "../common/TaskInterface";
import { Expose } from "class-transformer";

export class TaskEntity implements TaskInterface {

  constructor(private _name: string,
              private _id: TaskId) {  }

  @Expose()
  get id(): TaskId {
    return this._id;
  }

  @Expose()
  get name(): string {
    return this._name;
  }
}
