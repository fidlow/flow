
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { AccountOrmEntity } from "../accounts/account.orm-entity";
import { EventOrmEntity } from "../events/event.orm-entity";

@Index('project_id_uindex', ['id'], { unique: true })
@Index('project_pk', ['id'], { unique: true })
@Entity('project', { schema: 'public' })
export class ProjectOrmEntity {

  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Column('character varying', { name: 'name' })
  name: string;

  @Column('bigint', {
    name: 'created_date',
    default: () => "(date_part('epoch', now()) * (1000)::double precision)",
  })
  createdDate: string;

  @ManyToOne(() => AccountOrmEntity, (account) => account.projects, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "owner", referencedColumnName: "id" }])
  owner: AccountOrmEntity;

  @OneToMany(() => EventOrmEntity, (event) => event.project)
  events: EventOrmEntity[];

}
