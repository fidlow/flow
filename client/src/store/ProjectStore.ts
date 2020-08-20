import { cast, destroy, getParent, Instance, SnapshotOrInstance, types } from "mobx-state-tree";
import { ExecutionStatus } from "../common/ExecutionStatus";
import { ProjectId } from "../commonFromServer/ProjectInterface";

const TaskStore = types.model("Task", {
  id: types.identifier,
  endDate: types.Date,
  name: types.string,
  manager: types.string,
  status: types.number,
  jobs: types.optional(types.array(types.string), [])
});

const ProjectStore = types
  .model("Project", {
    id: types.identifier,
    date: types.Date,
    name: types.string,
    owner: types.string,
    tasks: types.optional(types.array(TaskStore), [])
  })
  .views(self => ({
    get status() {
      if (self.tasks?.length > 0) {
        const statuses = self.tasks.map(t => t.status);
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
    }
  }))
  .actions(self => ({
    addTask(task: SnapshotOrInstance<typeof TaskStore>): void {
      self.tasks.push(task);
    },
    remove() {
      getParent<ProjectsStoreType>(self, 2).removeProject(cast(self));
    }
  }));

const ProjectsStore = types
  .model("Projects", {
    projects: types.optional(types.array(ProjectStore), [])
  })
  .actions(self => ({
    addProject(project: SnapshotOrInstance<typeof ProjectStore>): void {
      self.projects.push(project);
    },
    removeProject(project: ProjectStoreType){
      destroy(project);
    },
    deleteProjectById(projectId: ProjectId): void {
      self.projects.replace(self.projects.filter(p => p.id !== projectId));
    }
  }));

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type ProjectStoreType = Instance<typeof ProjectStore>;
export type ProjectsStoreType = Instance<typeof ProjectsStore>;
export default ProjectsStore;
