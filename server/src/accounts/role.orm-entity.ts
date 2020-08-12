import {
  Column,
  Entity,
  Index, JoinTable, ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { AccountOrmEntity } from "./account.orm-entity";
// import { RolePermissionOrmEntity } from "./role-permission.orm-entity";

@Index("role_pk", ["id"], { unique: true })
@Index("role_id_uindex", ["id"], { unique: true })
@Entity("role", { schema: "public" })
export class RoleOrmEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name" })
  name: string;

  @ManyToMany(() => AccountOrmEntity, (account) => account.roles)
  @JoinTable({name: 'role_account'})
  accounts: AccountOrmEntity[];

  // @OneToMany(() => RolePermissionOrmEntity, (rolePermission) => rolePermission.role)
  // rolePermissions: RolePermissionOrmEntity[];
}
