import { ProjectId, ProjectInterface } from "../common/ProjectInterface";
import { EventInterface } from "../common/EventInterface";
import { AccountId } from "../common/AccountInterface";
import { Expose } from "class-transformer";

export class ProjectEntity implements ProjectInterface {
  private _events?: EventInterface[];

  constructor(
    private _createdDate: number,
    private _name: string,
    private _owner: AccountId,
    private _id?: ProjectId,
    private _endDate?: number,
  ) {}

  get events(): EventInterface[] {
    return this._events ?? [];
  }
  @Expose()
  get id(): ProjectId {
    return this._id !== undefined ? this._id : "";
  }
  @Expose()
  get createdDate(): number {
    return this._createdDate;
  }
  @Expose()
  get name(): string {
    return this._name;
  }
  @Expose()
  get owner(): AccountId {
    return this._owner;
  }
}
