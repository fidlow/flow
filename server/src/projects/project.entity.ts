import { ProjectInterface } from '../common/ProjectInterface';
import { ExecutionStatus } from '../common/ExecutionStatus';
import { TaskInterface } from '../common/TaskInterface';
import { AccountEntity } from '../accounts/account.entity';

export class ProjectEntity implements ProjectInterface {
  private _tasks?: TaskInterface[];

  constructor(
    private _id: string,
    private _date: Date,
    private _name: string,
    private _status: ExecutionStatus,
    private _owner: AccountEntity,
  ) {}

  get tasks(): TaskInterface[] {
    return this._tasks;
  }

  get id(): string {
    return this._id;
  }

  get date(): Date {
    return this._date;
  }

  get name(): string {
    return this._name;
  }

  get status(): ExecutionStatus {
    return this._status;
  }

  get owner(): AccountEntity {
    return this._owner;
  }
}
