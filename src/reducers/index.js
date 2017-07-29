import { combineReducers } from 'redux';
import students from './students';
import student from './student';

const reducers = combineReducers({
  students,
  student,
})

export default reducers;