import { StateType } from '../types/types';
import { SET_PROJECTS_DATA } from './actionTypes';

import { getDataFromDataBase } from '../serviсes/db';

import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

export function fetchProjectsData(
  userId: string
): ThunkAction<void, StateType, unknown, AnyAction> {
  return async (dispatch) => {
    try {
      getDataFromDataBase(userId, dispatch, {
        type: SET_PROJECTS_DATA,
        payload: [],
      });
    } catch (error) {
      console.log(error);
    }
  };
}
