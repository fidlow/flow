import { cast, getParent, Instance, types } from "mobx-state-tree";
import { EventStoreType } from "./EventStore";

const TaskStore = types.model('Task', {
  id: types.string,
  name: types.string
}).actions(self => ({
  remove() {
    getParent<EventStoreType>(self,2).deleteTask(cast(self));
  }
}))

export default TaskStore;
export type TaskStoreType = Instance<typeof TaskStore>
