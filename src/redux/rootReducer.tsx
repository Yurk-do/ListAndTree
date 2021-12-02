import { combineReducers } from 'redux';
import { projectsDataReducer } from './projectsDataReducer';

export const rootReducer = combineReducers({
  data: projectsDataReducer,
});
