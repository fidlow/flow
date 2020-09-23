import { cast, destroy, getParent, Instance, SnapshotOrInstance, types } from "mobx-state-tree";
import { ExecutionStatus } from "../common/ExecutionStatus";
import { TaskStore, TaskStoreType } from "./TaskStore";

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
    removeTask(task: TaskStoreType): void {
      destroy(task);
    },
    updateTask(task: TaskStoreType): void {
      const index = self.tasks.findIndex((p) => p.id === task.id);
      self.tasks[index] = task;
    },
    // update(project: Instance<typeof self>): void {
    //   Object.keys(project).forEach(key => {
    //     self[key] = cast(project[key])
    //   })
    //   Object.entries(project).forEach(([key,value]) => self[key]=value);
    // },
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
      const project2 = {...project, id: 'asdasdasdad', date: Date.now(), owner:'aaaaaa' };
      self.projects.push(cast(project2));
    },
    updateProject(project: ProjectStoreType): void {
      const index = self.projects.findIndex((p) => p.id === project.id);
      self.projects[index] = project;
    },
    removeProject(project: ProjectStoreType){
      destroy(project);
    }
  }));

export type ProjectStoreType = Instance<typeof ProjectStore>;
type ProjectsStoreType = Instance<typeof ProjectsStore>;
export default ProjectsStore;
