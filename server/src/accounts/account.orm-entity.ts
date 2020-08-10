import {Column, Entity, Index, OneToOne, PrimaryGeneratedColumn} from "typeorm";

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

  // @OneToOne(() => AccountRoleOrmEntity, (accountRole) => accountRole.account)
  // accountRole: AccountRoleOrmEntity;
}
