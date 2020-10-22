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
    }),
    loadUser: flow(function* () {
      const res = yield Api.getUser();
      if(res.isError === false) {
        self.user=res.message as AccountStoreType;
        localStorage.setItem('user', JSON.stringify(res.message));
      } else {
        throw Error(res.message as string)
      }
      return res;
    }),
    checkLogin: flow(function* () {
      yield Api.checkLogin()
    }),
    update: flow(function* (account: UpdateAccountDto) {
      const res = yield Api.updateMyAccount(cast(account));
      if(res.isError === false) {
        self.user = {...self.user, email: account.email, name: account.name} as AccountStoreType;
        localStorage.setItem('user', JSON.stringify(self.user));
      } else {
        throw Error(res.message as string)
      }
    }),
  }));
export default UserStore;
export type UserStoreType = Instance<typeof UserStore>;
export type UpdateAccountDto = {
  email: string;
  name: string;
  old_password: string;
  new_password?: string;

}
