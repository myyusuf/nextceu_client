import { createLogic } from 'redux-logic';

const addRoleLogic = createLogic({
  type: 'ADD_ROLE_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_ROLE_FORM' });
    dispatch({ type: 'SHOW_ROLE_WINDOW' });
    done();
  },
});

const cancelAddRoleLogic = createLogic({
  type: 'CANCEL_ADD_ROLE_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_ROLE_FORM' });
    dispatch({ type: 'HIDE_ROLE_WINDOW' });
    done();
  },
});

const saveRoleLogic = createLogic({
  type: 'SAVE_ROLE_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_ROLE_FORM' });
    dispatch({ type: 'HIDE_ROLE_WINDOW' });
    done();
  },
});

export default [
  addRoleLogic,
  cancelAddRoleLogic,
  saveRoleLogic,
];
