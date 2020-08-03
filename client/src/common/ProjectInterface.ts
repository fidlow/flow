import {Dispatch} from "react";
import {ExecutionStatus} from "./Enums";
import {TaskInterface} from "./TaskInterface";
import {ProjectReduceAction} from "../reducers";
import {Project} from "../entities/project.entity";

export interface ProjectInterface {
    id: string;
    name: string;
    date: Date;
    status: ExecutionStatus;
    tasks?: TaskInterface[];
    // addTask(task: TaskInterface): void;
    // updateTask(task: TaskInterface): void;
    // deleteTaskById(taskId: string): void;
}

export interface ProjectContext {
    dataProjectState: Project[];
    dispatchProjectData: Dispatch<ProjectReduceAction>;
}
