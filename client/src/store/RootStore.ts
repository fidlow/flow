import { Instance, types } from "mobx-state-tree";
import ProjectsStore from "./ProjectStore";
import AccountStore from "./AccountStore";
import ManagersStore from "./ManagerStore";

export type RootStoreModel = Instance<typeof RootStore>

const RootStore = types.model("RootState", {
  projectsStore: ProjectsStore,
  userStore: AccountStore,
  managersStore: ManagersStore
});

export default RootStore;
