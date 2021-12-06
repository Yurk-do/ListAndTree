import { LOGIN_IN } from './actionTypes';
import { AuthStateType, AuthActionType } from '../types/types';

const initialState: AuthStateType = {
  userEmail: null,
  userId: null,
};

export const projectsDataReducer = (
  state = initialState,
  { type, payload }: AuthActionType
) => {
  switch (type) {
    case LOGIN_IN:
      return { ...state, userEmail: payload.userEmail, userId: payload.userId };
    default:
      return state;
  }
};
