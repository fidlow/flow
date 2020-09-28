import { types } from "mobx-state-tree";
import AccountStore from "./AccountStore";


const ManagersStore = types
  .model("Managers", {
    managers: types.optional(types.array(AccountStore), []),
  })

export default ManagersStore
