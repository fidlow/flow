import {Project} from "./entities/project.entity";

export interface Action {
  type: string;
}

export enum ProjectReducer {
  Add = 'ADD',
  Update = 'UPDATE',
  Delete = 'DELETE',
}

export interface ProjectReduceAction extends Action {
  type: ProjectReducer;
  payload: Project;
}

export const dataReducer = (state: Project[], action: ProjectReduceAction): Project[] => {
  switch (action.type) {
    case ProjectReducer.Add: {
      const newState = [...state];
      newState.push(action.payload);
      return newState;
    }
    case ProjectReducer.Update: {
      const newState = [...state];
      const index = state.findIndex((p) => p.id === action.payload.id);
      state[index] = action.payload;
      return newState;
    }
    case ProjectReducer.Delete: {
      return state.filter((p) => p.id !== action.payload.id);
    }
    default:
      return state
  }
};
