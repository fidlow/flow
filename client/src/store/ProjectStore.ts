import {
  cast,
  destroy,
  flow,
  getParent, getSnapshot,
  Instance,
  SnapshotOrInstance,
  types
} from "mobx-state-tree";
import { ExecutionStatus } from "../common/ExecutionStatus";
import EventStore, { EventStoreType } from "./EventStore";
import Api from "../api/api";

const ProjectStore = types
  .model("Project", {
    id: types.identifier,
    createdDate: types.Date,
    name: types.string,
    owner: types.string,
    events: types.optional(types.array(EventStore), []),
  })
  .views((self) => ({
    get status(): ExecutionStatus {
      if (self.events?.length > 0) {
        const statuses = self.events.map((e) => e.status);
        if (statuses.indexOf(ExecutionStatus.Aborted) !== -1)
          return ExecutionStatus.Aborted;
        if (statuses.indexOf(ExecutionStatus.Processing) !== -1)
          return ExecutionStatus.Processing;
        if (statuses.indexOf(ExecutionStatus.NotRunning) !== -1)
          return ExecutionStatus.NotRunning;
        if (statuses.indexOf(ExecutionStatus.Finished) !== -1)
          return ExecutionStatus.Finished;
        return ExecutionStatus.Error;
      }
      return ExecutionStatus.NotRunning;
    },
    get endDate(): Date | null {
      if (self.events?.length > 0) {
        const events = getSnapshot(self.events)
        const maxEventDate = events
          .slice(1)
          .reduce(
            (maxDate, event) =>
              maxDate > event.endDate ? maxDate : event.endDate,
            self.events[0].endDate.getTime()
          );
        return new Date(maxEventDate);
      }
      return null;
    },
  }))
  .actions((self) => ({
    addEvent(event: SnapshotOrInstance<typeof EventStore>): void {
      const newEvent = { ...event, id: "testEventId" };
      self.events.push(newEvent);
    },
    removeEvent(event: EventStoreType): void {
      destroy(event);
    },
    updateEvent(event: EventStoreType): void {
      const index = self.events.findIndex((e) => e.id === event.id);
      self.events[index] = event;

    },
    loadProjects() {
      console.log("ok");
    },
    remove() {
      getParent<ProjectsStoreType>(self, 2).removeProject(cast(self));
    },
  }));

const ProjectsStore = types
  .model("Projects", {
    projects: types.optional(types.array(ProjectStore), []),
  })
  .actions((self) => ({
    loadProjects: flow(function* () {
      const res = yield Api.getProjects();
      console.log(...res.message);
      if (res.isError === false) {
        self.projects.clear();
        self.projects.push(...(res.message as ProjectStoreType[]));
        console.log(self.projects);
      }
      return res;
    }),
    addProject(project: SnapshotOrInstance<typeof ProjectStore>): void {
      const newProject = {
        ...project,
        id: "testProjectId",
        date: Date.now(),
        owner: "1111",
      };
      self.projects.push(cast(newProject));
    },
    updateProject(project: ProjectStoreType): void {
      const index = self.projects.findIndex((p) => p.id === project.id);
      self.projects[index] = project;
    },
    removeProject(project: ProjectStoreType) {
      destroy(project);
    },
  }));

export type ProjectStoreType = Instance<typeof ProjectStore>;
type ProjectsStoreType = Instance<typeof ProjectsStore>;
export default ProjectsStore;
