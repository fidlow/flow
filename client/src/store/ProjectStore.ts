import {
  applySnapshot,
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
import AccountStore, { AccountStoreType } from "./AccountStore";
import { RootStoreModel } from "./RootStore";

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
    addEvent: flow(function* (event: SnapshotOrInstance<typeof EventStore>) {
      event.endDate = event.endDate.valueOf();
      const res = yield Api.addEventToProject(self.id, cast(event));
      if(res.isError  === false) {
        const newEvent: EventStoreType = cast({
          ...event,
          id: res.message as string,
          manager: getParent<RootStoreModel>(self, 3).userStore.user?.id || "",
        });
        self.events.push(newEvent);
      } else {
        throw Error(res.message as string)
      }
      const newEvent = { ...event, id: "testEventId" };
      self.events.push(newEvent);
    }),
    deleteEvent: flow(function* (event: EventStoreType) {
      const res = yield Api.deleteEvent(event.id);
      if (res.isError === false) {
        destroy(event);
      } else {
        throw Error(res.message as string)
      }
    }),
    updateEvent: flow(function* (event: SnapshotOrInstance<typeof EventStore>) {
      event.endDate = event.endDate.valueOf();
      const res = yield Api.updateEvent(cast(event));
      if(res.isError  === false) {
        const index = self.events.findIndex((e) => e.id === event.id);
        applySnapshot(self.events[index],{...event as EventStoreType});
      } else {
        throw Error(res.message as string)
      }
    }),
    remove() {
      getParent<ProjectsStoreType>(self, 2).deleteProject(cast(self));
    },
    loadEvent(projectId: string) {
      getParent<ProjectsStoreType>(  self, 2).loadProjectById(projectId);
    //   //const res = yield Api.getEventById(projectId);
    },
  }));

const ProjectsStore = types
  .model("Projects", {
    projects: types.optional(types.array(ProjectStore), []),
    managers: types.optional(types.array(AccountStore), []),
  })
  .actions((self) => {
    const loadProjects = flow(function* () {
      const res = yield Api.getProjects();
      if (res.isError === false) {
        self.projects.clear();
        self.projects.push(...(res.message as ProjectStoreType[]));

      }
      return res;
    });
    const loadManagers = flow(function* () {
      const res = yield Api.getManagers();
      if(res.isError === false) {
        self.managers.clear();
        self.managers.push(...(res.message as AccountStoreType[]));
      } else {
        throw Error(res.message as string)
      }
      return res;
    });
    const loadProjectById = flow(function* (projectId: string) {
      yield loadManagers();
      const res = yield Api.getProjectById(projectId);
      if (res.isError === false) {
        const indexProject = self.projects.findIndex((p) => p.id===projectId);
        if(indexProject === -1)
          self.projects.push(res.message as ProjectStoreType);
        else
          self.projects[indexProject] = res.message as ProjectStoreType;
      } else {
        throw Error(res.message as string)
      }
      return res;
    });
    const addProject =  flow(function* (project: SnapshotOrInstance<typeof ProjectStore>) {
      project.createdDate = Date.now();
      const res = yield Api.addProject(cast(project));
      if(res.isError  === false) {
        const newProject = {
          ...project,
          id: res.message as string,
          owner: getParent<RootStoreModel>(self, 1).userStore.user?.id || "",
        };
        self.projects.push(cast(newProject));
      } else {
        throw Error(res.message as string)
      }
    });
    const updateProject = flow(function* (project: SnapshotOrInstance<typeof ProjectStore>) {
      project.createdDate = project.createdDate.valueOf();
      const res = yield Api.updateProject(cast(project));
      if(res.isError  === false) {
        const index = self.projects.findIndex((p) => p.id === project.id);
        self.projects[index] = project as ProjectStoreType;
      } else {
        throw Error(res.message as string)
      }
    });
    const deleteProject = flow(function* (project: SnapshotOrInstance<typeof ProjectStore>) {
      const res = yield Api.deleteProject(project.id);
      if (res.isError === false) {
        destroy(project);
      } else {
        throw Error(res.message as string)
      }
    });
    return { loadProjects, loadProjectById, addProject, updateProject, deleteProject };
  });

export type ProjectStoreType = Instance<typeof ProjectStore>;
type ProjectsStoreType = Instance<typeof ProjectsStore>;
export default ProjectsStore;
