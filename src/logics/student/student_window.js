import { createLogic } from 'redux-logic';

const openAddStudentWindow = createLogic({
  type: 'OPEN_ADD_STUDENT_WINDOW',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_ADD_STUDENT_FORM' });
    dispatch({ type: 'SHOW_ADD_STUDENT_WINDOW' });
    done();
  },
});

const closeAddStudentWindow = createLogic({
  type: 'CLOSE_ADD_STUDENT_WINDOW',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_ADD_STUDENT_FORM' });
    dispatch({ type: 'HIDE_ADD_STUDENT_WINDOW' });
    done();
  },
});

export default [
  openAddStudentWindow,
  closeAddStudentWindow,
];
