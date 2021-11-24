import {
  ProjectsDataActionType, ProjectsDataListItemType
} from '../types/types';
import {
  SAVE_DATA,
} from './actionTypes';

export function saveData(data: ProjectsDataListItemType[]): ProjectsDataActionType {
  return {
    type: SAVE_DATA,
    payload: data,
  };
}

