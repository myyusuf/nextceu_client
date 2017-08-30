import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';
import { validateLength, validateExist } from '../../utils/validation';

const HOSPITALS_URL = `${Constant.serverUrl}/api/hospitals`;
const HOSPITAL_SCHEDULES_URL = `${Constant.serverUrl}/api/hospitalselect/hospitalschedules`;

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'code':
    case 'name':
      result = validateLength(key, value, 3);
      break;
    case 'hospitalType':
      result = validateExist(key, value);
      break;
    default:
      break;
  }

  return result;
};

const fetchHospitalsLogic = createLogic({
  type: 'FETCH_HOSPITALS_LOGIC',
  cancelType: 'CANCEL_FETCH_HOSPITALS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().hospitalReducers.hospitalSearch;
    const paramameters = search ? { params: { ...search } } : {};
    dispatch({ type: 'HOSPITAL_LOADING_START' });
    // axios.get(HOSPITALS_URL, paramameters)
    axios.get(HOSPITAL_SCHEDULES_URL, paramameters)
      .then(resp => resp.data)
      .then((hospitals) => {
        dispatch({ type: 'HOSPITAL_LOADING_FINISH' });
        dispatch({ type: 'FETCH_HOSPITALS_SUCCESS', payload: hospitals });

        dispatch({ type: 'CLEAR_HOSPITAL_FORM' });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'HOSPITAL_LOADING_FINISH' });
        notification.error({
          message: 'Fetch hospitals error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const editHospitalLogic = createLogic({
  type: 'EDIT_HOSPITAL_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_HOSPITAL_MODAL_FORM' });
    dispatch({ type: 'SHOW_HOSPITAL_WINDOW' });
    done();
  },
});

const cancelAddHospitalLogic = createLogic({
  type: 'CANCEL_EDIT_HOSPITAL_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_HOSPITAL_MODAL_FORM' });
    dispatch({ type: 'HIDE_HOSPITAL_WINDOW' });
    done();
  },
});

const saveHospitalModalLogic = createLogic({
  type: 'SAVE_HOSPITAL_MODAL_LOGIC',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const hospitalForm = { ...getState().hospitalReducers.hospitalModalForm };
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
      reject({ type: 'SHOW_HOSPITAL_MODAL_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const hospitalForm = _.mapValues({ ...getState().hospitalReducers.hospitalModalForm }, 'value');
    dispatch({ type: 'SHOW_HOSPITAL_WINDOW_CONFIRM_LOADING' });

    axios.post(HOSPITALS_URL, hospitalForm)
      .then(() => {
        dispatch({ type: 'HIDE_HOSPITAL_WINDOW_CONFIRM_LOADING' });
        dispatch({ type: 'CANCEL_EDIT_HOSPITAL_LOGIC' });
        dispatch({ type: 'FETCH_HOSPITALS_LOGIC' });
        notification.success({
          message: 'Create hospital success',
          description: 'Success saving hospital',
        });
      })
      .catch((err) => {
        let errorMessage = '';
        if (err.response) {
          if (err.response.status === 500) {
            errorMessage = 'Ex. Hospital code must be unique';
          } else {
            errorMessage = `Status: ${err.response.status}`;
          }
        } else if (err.request) {
          errorMessage = 'Connection error.';
        } else {
          errorMessage = err.message;
        }
        dispatch({ type: 'HIDE_HOSPITAL_WINDOW_CONFIRM_LOADING' });
        notification.error({
          message: 'Create hospital error',
          description: errorMessage,
        });
      })
      .then(() => done());
  },
});

const saveHospitalLogic = createLogic({
  type: 'SAVE_HOSPITAL_LOGIC',
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
    dispatch({ type: 'SHOW_HOSPITAL_CONTAINER_CONFIRM_LOADING' });

    axios.put(`${HOSPITALS_URL}/${hospitalForm.id}`, hospitalForm)
      .then(() => {
        dispatch({ type: 'HIDE_HOSPITAL_CONTAINER_CONFIRM_LOADING' });
        dispatch({ type: 'FETCH_HOSPITALS_LOGIC' });
        notification.success({
          message: 'Update hospital success',
          description: 'Success saving hospital',
        });
      })
      .catch((err) => {
        let errorMessage = '';
        if (err.response) {
          if (err.response.status === 500) {
            errorMessage = 'Ex. Hospital code must be unique';
          } else {
            errorMessage = `Status: ${err.response.status}`;
          }
        } else if (err.request) {
          errorMessage = 'Connection error.';
        } else {
          errorMessage = err.message;
        }
        dispatch({ type: 'HIDE_HOSPITAL_CONTAINER_CONFIRM_LOADING' });
        notification.error({
          message: 'Update hospital error',
          description: errorMessage,
        });
      })
      .then(() => done());
  },
});

const deleteHospitalLogic = createLogic({
  type: 'DELETE_HOSPITAL_LOGIC',
  process({ getState, action }, dispatch, done) {
    axios.delete(`${HOSPITALS_URL}/${action.payload.id}`)
      .then(resp => resp.data)
      .then(() => {
        notification.success({
          message: 'Delete hospital success',
          description: 'Success deleting hospital',
        });
        dispatch({ type: 'FETCH_HOSPITALS_LOGIC' });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Delete hospital error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const selectHospitalLogic = createLogic({
  type: 'SELECT_HOSPITAL_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'SELECT_HOSPITAL', payload: action.payload });

    dispatch({ type: 'LOAD_HOSPITAL_TO_FORM_LOGIC', payload: action.payload });
    dispatch({ type: 'FETCH_HOSPITAL_DEPARTMENTS_LOGIC' });

    done();
  },
});

export default [
  fetchHospitalsLogic,
  editHospitalLogic,
  cancelAddHospitalLogic,
  saveHospitalModalLogic,
  saveHospitalLogic,
  deleteHospitalLogic,
  selectHospitalLogic,
];
