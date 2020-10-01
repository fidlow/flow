import { Instance, types } from "mobx-state-tree";
import ProjectsStore from "./ProjectStore";
import ManagersStore from "./ManagerStore";
import UserStore from "./UserStore";

export type RootStoreModel = Instance<typeof RootStore>

const RootStore = types.model("RootState", {
  projectsStore: ProjectsStore,
  userStore: UserStore,
  managersStore: ManagersStore
});



export default RootStore;
