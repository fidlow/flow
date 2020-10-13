import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AccountOrmEntity } from "../accounts/account.orm-entity";
import { ProjectOrmEntity } from "../projects/project.orm-entity";
import { TaskOrmEntity } from "../tasks/task.orm-entity";

@Index("task_pk", ["id"], { unique: true })
@Entity("event", { schema: "public" })
export class EventOrmEntity {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "uuid_generate_v4()",
  })
  id: string;

  @Column("character varying", { name: "name"})
  name: string;

  @Column("character varying", {
    name: "end_date",
    nullable: false,
    default: () => "(date_part('epoch', now()) * (1000)::double precision)",
  })
  endDate: string;

  @Column("integer", { name: "status"})
  status: number;

  @ManyToOne(() => AccountOrmEntity, (account) => account.events)
  @JoinColumn([{ name: "manager", referencedColumnName: "id" }])
  manager: AccountOrmEntity;

  @ManyToOne(() => ProjectOrmEntity, (project) => project.events, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "project_id", referencedColumnName: "id" }])
  project: ProjectOrmEntity;

  @OneToMany(() => TaskOrmEntity, (task) => task.event)
  tasks: TaskOrmEntity[];
}
