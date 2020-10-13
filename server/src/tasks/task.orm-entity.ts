import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { EventOrmEntity } from "../events/event.orm-entity";

@Index("task_pk_2", ["id"], { unique: true })
@Entity("task", { schema: "public" })
export class TaskOrmEntity {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("character varying", { name: "name" })
  name: string;

  @ManyToOne(() => EventOrmEntity, (event) => event.tasks)
  @JoinColumn([{ name: "event_id", referencedColumnName: "id" }])
  event: EventOrmEntity;
}
