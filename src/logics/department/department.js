import { createLogic } from 'redux-logic';

const addDepartmentLogic = createLogic({
  type: 'ADD_DEPARTMENT_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_DEPARTMENT_FORM' });
    dispatch({ type: 'SHOW_DEPARTMENT_WINDOW' });
    done();
  },
});

const cancelAddDepartmentLogic = createLogic({
  type: 'CANCEL_ADD_DEPARTMENT_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_DEPARTMENT_FORM' });
    dispatch({ type: 'HIDE_DEPARTMENT_WINDOW' });
    done();
  },
});

const saveDepartmentLogic = createLogic({
  type: 'SAVE_DEPARTMENT_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_DEPARTMENT_FORM' });
    dispatch({ type: 'HIDE_DEPARTMENT_WINDOW' });
    done();
  },
});

export default [
  addDepartmentLogic,
  cancelAddDepartmentLogic,
  saveDepartmentLogic,
];
