// import {
//   Entity,
//   Index,
//   JoinColumn,
//   ManyToOne,
//   PrimaryGeneratedColumn,
// } from "typeorm";
// import { AccountOrmEntity } from "./account.orm-entity";
// import { RoleOrmEntity } from "./role.orm-entity";
//
// @Index("role_account_pk", ["id"], { unique: true })
// @Entity("role_account", { schema: "public" })
// export class RoleAccountOrmEntity {
//   @PrimaryGeneratedColumn({ type: "integer", name: "id" })
//   id: number;
//
//   @ManyToOne(() => AccountOrmEntity, (account) => account.roleAccounts, {
//     onDelete: "CASCADE",
//   })
//   @JoinColumn([{ name: "account_id", referencedColumnName: "id" }])
//   account: AccountOrmEntity;
//
//   @ManyToOne(() => RoleOrmEntity, (role) => role.roleAccounts, { onDelete: "CASCADE" })
//   @JoinColumn([{ name: "role_id", referencedColumnName: "id" }])
//   role: RoleOrmEntity;
// }
