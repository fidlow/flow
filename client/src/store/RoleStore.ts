import { Instance, types } from "mobx-state-tree";

const RoleStore = types
  .model("Account", {
    id: types.number,
    name: types.string
  })

export default RoleStore;
export type RoleStoreType = Instance<typeof RoleStore>;
