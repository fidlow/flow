import { ProjectId, ProjectInterface } from "../common/ProjectInterface";
import { TaskInterface } from "../common/TaskInterface";
import { AccountId } from "../common/AccountInterface";

export class ProjectEntity implements ProjectInterface {
  private _tasks?: TaskInterface[];

  constructor(
    private _date: Date,
    private _name: string,
    private _owner: AccountId,
    private _id?: ProjectId,
  ) {}

  get tasks(): TaskInterface[] {
    return this._tasks;
  }

  get id(): ProjectId {
    return this._id !== undefined ? this._id : null;
  }

  get date(): Date {
    return this._date;
  }

  get name(): string {
    return this._name;
  }

  get owner(): AccountId {
    return this._owner;
  }
}
