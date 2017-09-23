import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';
import { validateLength } from '../../utils/validation';

const SUPERVISORS_URL = `${Constant.serverUrl}/api/supervisors`;
const SUPERVISORS_FOR_SELECT_URL = `${Constant.serverUrl}/api/supervisorsforselect`;

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

const fetchSupervisorsLogic = createLogic({
  type: 'FETCH_SUPERVISORS_LOGIC',
  cancelType: 'CANCEL_FETCH_SUPERVISORS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().supervisorReducers.supervisorSearch;
    const paramameters = search ? { params: { ...search } } : {};
    dispatch({ type: 'SUPERVISOR_LOADING_START' });
    axios.get(SUPERVISORS_URL, paramameters)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'SUPERVISOR_LOADING_FINISH' });
        dispatch({ type: 'FETCH_SUPERVISORS_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'SUPERVISOR_LOADING_FINISH' });
        notification.error({
          message: 'Fetch supervisors error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const fetchSupervisorsForSelectLogic = createLogic({
  type: 'FETCH_SUPERVISORS_FOR_SELECT_LOGIC',
  cancelType: 'CANCEL_FETCH_SUPERVISORS_FOR_SELECT_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    axios.get(SUPERVISORS_FOR_SELECT_URL)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'FETCH_SUPERVISORS_FOR_SELECT_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Fetch supervisors error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const editSupervisorLogic = createLogic({
  type: 'EDIT_SUPERVISOR_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_SUPERVISOR_FORM' });
    dispatch({ type: 'SHOW_SUPERVISOR_WINDOW' });
    done();
  },
});

const cancelAddSupervisorLogic = createLogic({
  type: 'CANCEL_EDIT_SUPERVISOR_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_SUPERVISOR_FORM' });
    dispatch({ type: 'HIDE_SUPERVISOR_WINDOW' });
    done();
  },
});

const saveSupervisorLogic = createLogic({
  type: 'SAVE_SUPERVISOR_LOGIC',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const supervisorForm = { ...getState().supervisorReducers.supervisorForm };
    const validationResult = {};
    const keys = _.keys(supervisorForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = supervisorForm[key].value;
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
      reject({ type: 'SHOW_SUPERVISOR_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const supervisorForm = _.mapValues({ ...getState().supervisorReducers.supervisorForm }, 'value');
    dispatch({ type: 'SHOW_SUPERVISOR_WINDOW_CONFIRM_LOADING' });

    if (supervisorForm.id) {
      axios.put(`${SUPERVISORS_URL}/${supervisorForm.id}`, supervisorForm)
        .then(() => {
          dispatch({ type: 'HIDE_SUPERVISOR_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_SUPERVISOR_LOGIC' });
          dispatch({ type: 'FETCH_SUPERVISORS_LOGIC' });
          notification.success({
            message: 'Update supervisor success',
            description: 'Success saving supervisor',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. code must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_SUPERVISOR_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Update supervisor error',
            description: errorMessage,
          });
        })
        .then(() => done());
    } else {
      axios.post(SUPERVISORS_URL, supervisorForm)
        .then(() => {
          dispatch({ type: 'HIDE_SUPERVISOR_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_SUPERVISOR_LOGIC' });
          dispatch({ type: 'FETCH_SUPERVISORS_LOGIC' });
          notification.success({
            message: 'Create supervisor success',
            description: 'Success saving supervisor',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. Supervisorname must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_SUPERVISOR_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Create supervisor error',
            description: errorMessage,
          });
        })
        .then(() => done());
    }
  },
});

const deleteSupervisorLogic = createLogic({
  type: 'DELETE_SUPERVISOR_LOGIC',
  process({ getState, action }, dispatch, done) {
    axios.delete(`${SUPERVISORS_URL}/${action.payload.id}`)
      .then(resp => resp.data)
      .then(() => {
        notification.success({
          message: 'Delete supervisor success',
          description: 'Success deleting supervisor',
        });
        dispatch({ type: 'FETCH_SUPERVISORS_LOGIC' });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Delete supervisor error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const supervisorPageChangedLogic = createLogic({
  type: 'SUPERVISOR_PAGE_CHANGED_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'SUPERVISOR_CURRENT_PAGE_CHANGED', payload: action.payload });
    dispatch({ type: 'FETCH_SUPERVISORS_LOGIC' });
    done();
  },
});

export default [
  fetchSupervisorsLogic,
  fetchSupervisorsForSelectLogic,
  editSupervisorLogic,
  cancelAddSupervisorLogic,
  saveSupervisorLogic,
  deleteSupervisorLogic,
  supervisorPageChangedLogic,
];
