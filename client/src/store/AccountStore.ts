import { cast, getParent, Instance, types } from "mobx-state-tree";
import RoleStore from "./RoleStore";
import { UserStoreType } from "./UserStore";

const AccountStore = types
  .model("Account", {
    id: types.string,
    email: types.string,
    name: types.string,
    roles: types.optional(types.array(RoleStore),[])
  })
  .actions(self => ({
    remove() {
      getParent<UserStoreType>(self, 1).logout(cast(self));
    }
  }))

export default AccountStore;
export type AccountStoreType = Instance<typeof AccountStore>;
