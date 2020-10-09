import { EventId, EventInterface } from "../common/EventInterface";
import { ExecutionStatus } from "../common/ExecutionStatus";
import { Expose, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class EventEntity implements EventInterface {
  private _tasks?: string[];

  constructor(
    private _endDate: number,
    private _manager: string,
    private _name: string,
    private _status: ExecutionStatus,
    private _id?: EventId) {
  }
  @Expose()
  get id(): EventId {
    return this._id ?? "";
  }

  get tasks(): string[] {
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
