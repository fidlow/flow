import { cast, getParent, Instance, types } from "mobx-state-tree";
import { ProjectStoreType } from "./ProjectStore";

export const TaskStore = types.model("Task", {
  id: types.identifier,
  endDate: types.Date,
  name: types.string,
  manager: types.string,
  status: types.number,
  jobs: types.optional(types.array(types.string), [])
}).actions(self => ({
  remove() {
    getParent<ProjectStoreType>(self, 2).removeTask(cast(self));
  }
}));
export type TaskStoreType = Instance<typeof TaskStore>;
