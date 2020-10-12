import { cast, getParent, Instance, types } from "mobx-state-tree";
import { ProjectStoreType } from "./ProjectStore";

const EventStore = types.model("Event", {
  id: types.string,
  endDate: types.Date,
  name: types.string,
  manager: types.string,
  status: types.number,
  tasks: types.optional(types.array(types.string), [])
}).actions(self => ({
  remove() {
    getParent<ProjectStoreType>(self, 2).deleteEvent(cast(self));
  },
}));
export default EventStore;
export type EventStoreType = Instance<typeof EventStore>;
