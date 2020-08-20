import { Instance, types } from "mobx-state-tree";
import ProjectsStore from "./ProjectStore";

export type RootStoreModel = Instance<typeof RootStore>

const RootStore = types.model("RootStore", {
  projectsStore: ProjectsStore
});

export default RootStore;
