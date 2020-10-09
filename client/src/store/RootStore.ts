import { Instance, types } from "mobx-state-tree";
import ProjectsStore from "./ProjectStore";
import UserStore from "./UserStore";


const RootStore = types.model("RootState", {
  projectsStore: ProjectsStore,
  userStore: UserStore
});

export type RootStoreModel = Instance<typeof RootStore>


export default RootStore;
