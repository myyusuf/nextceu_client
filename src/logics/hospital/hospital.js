import { createLogic } from 'redux-logic';

const addHospitalLogic = createLogic({
  type: 'ADD_HOSPITAL_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_HOSPITAL_FORM' });
    dispatch({ type: 'SHOW_HOSPITAL_MODAL_WINDOW' });
    done();
  },
});

const cancelAddHospitalLogic = createLogic({
  type: 'CANCEL_ADD_HOSPITAL_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_HOSPITAL_FORM' });
    dispatch({ type: 'HIDE_HOSPITAL_MODAL_WINDOW' });
    done();
  },
});

const saveHospitalLogic = createLogic({
  type: 'SAVE_HOSPITAL_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_HOSPITAL_FORM' });
    dispatch({ type: 'HIDE_HOSPITAL_MODAL_WINDOW' });
    done();
  },
});

export default [
  addHospitalLogic,
  cancelAddHospitalLogic,
  saveHospitalLogic,
];
