import {
  applySnapshot,
  cast, destroy,
  flow,
  getParent,
  Instance,
  SnapshotOrInstance,
  types
} from "mobx-state-tree";
import { ProjectStoreType } from "./ProjectStore";
import TaskStore, { TaskStoreType } from "./TaskStore";
import Api from "../api/api";
import { TaskId } from "../commonFromServer/TaskInterface";

const EventStore = types
  .model("Event", {
    id: types.string,
    endDate: types.Date,
    name: types.string,
    manager: types.string,
    status: types.number,
    tasks: types.optional(types.array(TaskStore), []),
  })
  .actions((self) => ({
    remove() {
      getParent<ProjectStoreType>(self, 2).deleteEvent(cast(self));
    },
    addTask: flow(function* (task: SnapshotOrInstance<typeof TaskStore>) {
      const res = yield Api.addTaskToEvent(self.id, cast(task));
      if (res.isError === false) {
        const newTask: TaskStoreType = cast({
          ...task,
          id: res.message as TaskId,
        });
        self.tasks.push(newTask);
      } else {
        throw Error(res.message as string);
      }
    }),
    deleteTask: flow(function* (task: TaskStoreType) {
      const res = yield Api.deleteTask(task.id);
      if(res.isError === false) {
        destroy(task);
      } else {
        throw  Error(res.message as string);
      }
    }),
    updateTask: flow(function* (task: TaskStoreType) {
      const res = yield Api.updateTask(cast(task));
      if(res.isError === false) {
        const index = self.tasks.findIndex((t) => t.id === task.id);
        applySnapshot(self.tasks[index], task)
      } else {
        throw Error(res.message as string)
      }
    })
  }));
export default EventStore;
export type EventStoreType = Instance<typeof EventStore>;
