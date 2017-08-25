import { createLogic } from 'redux-logic';
import axios from 'axios';
import notification from 'antd/lib/notification';
import _ from 'lodash';
import { validateLength, validateEmail } from '../../utils/validation';

import Constant from '../../Constant';

const HOSPITALS_URL = `${Constant.serverUrl}/api/hospitals`;

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'code':
    case 'name':
      result = validateLength(key, value, 3);
      break;
    default:
      break;
  }
  return result;
};

const hospitalFormChangedLogic = createLogic({
  type: 'HOSPITAL_FORM_CHANGED',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_HOSPITAL_FORM', payload: result });
    done();
  },
});

const saveHospitalFormLogic = createLogic({
  type: 'SAVE_HOSPITAL_FORM',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const hospitalForm = { ...getState().hospitalReducers.hospitalForm };
    const validationResult = {};
    const keys = _.keys(hospitalForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = hospitalForm[key].value;
        validationResult[key] = {
          value,
          ...validate(key, value),
        };

        if (validationResult[key].validateStatus && validationResult[key].validateStatus === 'error') {
          isFormValid = false;
        }
      }
    }

    if (isFormValid) {
      allow(action);
    } else {
      reject({ type: 'SHOW_HOSPITAL_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const hospitalForm = _.mapValues({ ...getState().hospitalReducers.hospitalForm }, 'value');
    hospitalForm.level = 1;

    dispatch({ type: 'SHOW_HOSPITAL_MODAL_WINDOW_CONFIRM_LOADING' });

    if (hospitalForm.id) {
      axios.put(`${HOSPITALS_URL}/${hospitalForm.id}`, hospitalForm)
        .then((hospitals) => {
          dispatch({ type: 'HIDE_HOSPITAL_MODAL_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'SAVE_HOSPITAL_FORM_SUCCESS', payload: hospitals });
        })
        .catch((err) => {
          console.error(err);
          dispatch({ type: 'HIDE_HOSPITAL_MODAL_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'SAVE_HOSPITAL_FORM_FAILED', payload: err, error: true });
        })
        .then(() => done());
    } else {
      axios.post(HOSPITALS_URL, hospitalForm)
        .then((hospitals) => {
          dispatch({ type: 'HIDE_HOSPITAL_MODAL_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'SAVE_HOSPITAL_FORM_SUCCESS', payload: hospitals });
        })
        .catch((err) => {
          console.error(err);
          dispatch({ type: 'HIDE_HOSPITAL_MODAL_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'SAVE_HOSPITAL_FORM_FAILED', payload: err, error: true });
        })
        .then(() => done());
    }
  },
});

const saveHospitalFormSuccessLogic = createLogic({
  type: 'SAVE_HOSPITAL_FORM_SUCCESS',
  latest: true,
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLOSE_HOSPITAL_MODAL_WINDOW' });
    dispatch({ type: 'FETCH_HOSPITALS' });
    notification.success({
      message: 'Save Hospital Success',
      description: 'Success saving hospital',
    });
    done();
  },
});

const saveHospitalFormFailedLogic = createLogic({
  type: 'SAVE_HOSPITAL_FORM_FAILED',
  latest: true,
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLOSE_HOSPITAL_MODAL_WINDOW' });
    notification.error({
      message: 'Add Hospital Error',
      description: 'Error creating new hospital',
    });
    done();
  },
});

const loadHospitalFormLogic = createLogic({
  type: 'LOAD_HOSPITAL_TO_FORM',
  process({ getState, action }, dispatch, done) {
    const hospital = action.payload;
    const hospitalForm = {
      id: {
        value: hospital.id,
      },
      code: {
        value: hospital.code,
      },
      name: {
        value: hospital.name,
      },
    };
    const validationResult = {};
    const keys = _.keys(hospitalForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = hospitalForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'ADD_HOSPITAL_LOGIC' });
    dispatch({ type: 'LOAD_HOSPITAL', payload: validationResult });
    done();
  },
});

export default [
  hospitalFormChangedLogic,
  saveHospitalFormLogic,
  saveHospitalFormSuccessLogic,
  saveHospitalFormFailedLogic,
  loadHospitalFormLogic,
];
