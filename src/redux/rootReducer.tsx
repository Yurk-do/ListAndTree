import { combineReducers } from 'redux';
import { projectsDataReducer } from './projectsDataReducer';
import { authReducer } from './authReducer';

export const rootReducer = combineReducers({
  data: projectsDataReducer,
  auth: authReducer,
});
