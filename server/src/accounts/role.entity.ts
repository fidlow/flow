import { Expose } from 'class-transformer';

export default class RoleEntity {
  constructor(private readonly _id: number, private readonly _name: string) {}

  @Expose()
  get id(): number {
    return this._id;
  }

  @Expose({groups: ["get"]})
  get name(): string {
    return this._name;
  }
}
