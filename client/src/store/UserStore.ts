import { destroy, Instance, SnapshotOrInstance, types, flow, cast } from "mobx-state-tree";
import AccountStore, { AccountStoreType } from "./AccountStore";
import Api from "../api/api";

const UserStore = types
  .model("User", {
    user: types.maybe(AccountStore),
  })
  .actions((self) => ({
    logout(userToRemove: AccountStoreType): void {
      destroy(userToRemove);
      localStorage.removeItem('user')
    },
    login: flow(function* (account: SnapshotOrInstance<typeof AccountStore>) {
      const res = yield Api.login(cast(account));
      if(res.isError === false) {
        self.user=res.message as AccountStoreType;
        localStorage.setItem('user', JSON.stringify(res.message));
      } else {
        throw Error(res.message as string)
      }
      return res;
    })
  }));
export default UserStore;
export type UserStoreType = Instance<typeof UserStore>;
