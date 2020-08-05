import { Column, Entity, Index } from 'typeorm';

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
    name: 'date',
    default: () => "(date_part('epoch', now()) * (1000)::double precision)",
  })
  date: string;
}
