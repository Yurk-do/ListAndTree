import {
  ProjectsDataActionType,
  ProjectsDataListItemType,
  AuthActionType,
} from '../types/types';
import { SET_PROJECTS_DATA, LOGIN_IN, LOGIN_OUT } from './actionTypes';

export function setProjectsData(
  data: ProjectsDataListItemType[]
): ProjectsDataActionType {
  return {
    type: SET_PROJECTS_DATA,
    payload: data,
  };
}

export function loginIn(userName: string): AuthActionType {
  return {
    type: LOGIN_IN,
    payload: userName,
  };
}

export function loginOut(userName: string): AuthActionType {
  return {
    type: LOGIN_OUT,
    payload: userName,
  };
}
