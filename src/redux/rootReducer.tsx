import { combineReducers } from 'redux';
import { projectsDataReducer } from './projectsDataReducer';

export const rootReducer = combineReducers({
  projectsData: projectsDataReducer,

});