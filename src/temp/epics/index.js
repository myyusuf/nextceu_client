import { combineEpics } from 'redux-observable';
import { getStudentsEpic, getStudentEpic, createStudentEpic, updateStudentFormEpic } from './students';
import { getCoursesEpic } from './courses';

const rootEpic = combineEpics(
  getStudentsEpic,
  getStudentEpic,
  createStudentEpic,
  updateStudentFormEpic,
  getCoursesEpic,
);

export default rootEpic;
