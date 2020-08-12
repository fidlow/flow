import { Column, Entity, Index, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RoleOrmEntity } from "./role.orm-entity";

@Index("account_id_uindex", ["id"], { unique: true })
@Index("account_pk", ["id"], { unique: true })
@Entity("account", { schema: "public" })
export class AccountOrmEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("uuid", { name: "account_id", default: () => "uuid_generate_v4()" })
  accountId: string;

  @Column("character varying", { name: "email" })
  email: string;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("character varying", { name: "password" })
  password: string;

  @ManyToMany(() => RoleOrmEntity, (role) => role.accounts)
  roles: RoleOrmEntity[];
}
