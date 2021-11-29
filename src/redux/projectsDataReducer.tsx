import { SET_PROJECTS_DATA } from './actionTypes';
import { ProjectsDataStateType, ProjectsDataActionType } from '../types/types';

const initialState: ProjectsDataStateType = {
  projectsData: [],
};

export const projectsDataReducer = (
  state = initialState,
  { type, payload }: ProjectsDataActionType
) => {
  switch (type) {
    case SET_PROJECTS_DATA:
      return { ...state, projectsData: [...state.projectsData, payload] };
    default:
      return state;
  }
};
