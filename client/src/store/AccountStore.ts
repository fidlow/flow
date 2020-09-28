import { Instance, types } from "mobx-state-tree";
import RoleStore from "./RoleStore";

const AccountStore = types
  .model("Account", {
    id: types.string,
    email: types.string,
    name: types.string,
    roles: types.optional(types.array(RoleStore),[])
  })

export default AccountStore;
export type AccountStoreType = Instance<typeof AccountStore>;
