import { LOGIN_IN, LOGIN_OUT } from './actionTypes';
import { AuthStateType, AuthActionType } from '../types/types';

const initialState: AuthStateType = {
  userName: '',
  status: false,
};

export const authReducer = (
  state = initialState,
  { type, payload }: AuthActionType
) => {
  switch (type) {
    case LOGIN_IN:
      return { ...state, userName: payload, status: true };
    case LOGIN_OUT:
      return { ...state, userName: payload, status: true };
    default:
      return state;
  }
};
