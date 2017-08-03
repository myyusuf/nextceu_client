import { combineEpics } from 'redux-observable';
import { getStudentsEpic, getStudentEpic } from './students';

const rootEpic = combineEpics(
  getStudentsEpic,
  getStudentEpic,
);

export default rootEpic;
