import {
  SAVE_DATA,
} from './actionTypes';
import { ProjectsDataStateType, ProjectsDataActionType } from '../types/types';

const initialState: ProjectsDataStateType = {
  projectsData: [],
};

export const projectsDataReducer = (
  state = initialState,
  { type, payload }: ProjectsDataActionType
) => {
  switch (type) {
    case SAVE_DATA:
      return { ...state, projectsData: [...state.projectsData, payload] };
    default:
      return state;
  }
};