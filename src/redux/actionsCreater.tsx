import {
  ProjectsDataActionType,
  ProjectsDataListItemType,
} from '../types/types';
import { SET_PROJECTS_DATA } from './actionTypes';

export function setProjectsData(
  data: ProjectsDataListItemType[]
): ProjectsDataActionType {
  return {
    type: SET_PROJECTS_DATA,
    payload: data,
  };
}
