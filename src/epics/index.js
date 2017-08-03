import { combineEpics } from 'redux-observable';
import { getStudentsEpic } from './students';

const rootEpic = combineEpics(
  getStudentsEpic);

export default rootEpic;
