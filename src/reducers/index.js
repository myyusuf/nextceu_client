import { combineReducers } from 'redux';
import students from './students';
import student from './student';
import courses from './courses';

const rootReducer = combineReducers({
  students,
  student,
  courses,
});

export default rootReducer;
