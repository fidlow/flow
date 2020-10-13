import { EventId, EventInterface } from "../common/EventInterface";
import { ExecutionStatus } from "../common/ExecutionStatus";
import { Expose } from "class-transformer";
import { TaskInterface } from "../common/TaskInterface";

export class EventEntity implements EventInterface {

  constructor(
    private _endDate: number,
    private _manager: string,
    private _name: string,
    private _status: ExecutionStatus,
    private _id?: EventId,
    private _tasks?: TaskInterface[]) {
  }
  @Expose()
  get id(): EventId {
    return this._id ?? "";
  }

  @Expose({groups: ["getOne"]})
  get tasks(): TaskInterface[] {
    return this._tasks ?? [];
  }
  @Expose()
  get endDate(): number {
    return this._endDate;
  }
  @Expose()
  get manager(): string {
    return this._manager;
  }
  @Expose()
  get name(): string {
    return this._name;
  }
  @Expose()
  get status(): ExecutionStatus {
    return this._status;
  }
}
