import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';
import { validateExist } from '../../utils/validation';

const HOSPITAL_USERS_URL = `${Constant.serverUrl}/api/hospitalusers`;

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'hospital':
    case 'user':
      result = validateExist(key, value);
      break;
    default:
      break;
  }

  return result;
};

const fetchHospitalUsersLogic = createLogic({
  type: 'FETCH_HOSPITAL_USERS_LOGIC',
  cancelType: 'CANCEL_FETCH_HOSPITAL_USERS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().settingsReducers.userSearch;
    const paramameters = search ? { params: { ...search } } : {};
    dispatch({ type: 'HOSPITAL_USER_LOADING_START' });
    axios.get(HOSPITAL_USERS_URL, paramameters)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'HOSPITAL_USER_LOADING_FINISH' });
        dispatch({ type: 'FETCH_HOSPITAL_USERS_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'HOSPITAL_USER_LOADING_FINISH' });
        notification.error({
          message: 'Fetch users error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const editHospitalUserLogic = createLogic({
  type: 'EDIT_HOSPITAL_USER_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_HOSPITAL_USER_FORM' });
    dispatch({ type: 'SHOW_HOSPITAL_USER_WINDOW' });
    done();
  },
});

const cancelEditHospitalUserLogic = createLogic({
  type: 'CANCEL_EDIT_HOSPITAL_USER_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_HOSPITAL_USER_FORM' });
    dispatch({ type: 'HIDE_HOSPITAL_USER_WINDOW' });
    done();
  },
});

const saveHospitalUserLogic = createLogic({
  type: 'SAVE_HOSPITAL_USER_LOGIC',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const hospitalUserForm = { ...getState().settingsReducers.hospitalUserForm };
    const validationResult = {};
    const keys = _.keys(hospitalUserForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = hospitalUserForm[key].value;
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
      reject({ type: 'SHOW_HOSPITAL_USER_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const hospitalUserForm = _.mapValues({ ...getState().settingsReducers.hospitalUserForm }, 'value');
    dispatch({ type: 'SHOW_HOSPITAL_USER_WINDOW_CONFIRM_LOADING' });

    if (hospitalUserForm.id) {
      axios.put(`${HOSPITAL_USERS_URL}/${hospitalUserForm.id}`, hospitalUserForm)
        .then(() => {
          dispatch({ type: 'HIDE_HOSPITAL_USER_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_HOSPITAL_USER_LOGIC' });
          dispatch({ type: 'FETCH_HOSPITAL_USERS_LOGIC' });
          notification.success({
            message: 'Update user success',
            description: 'Success saving user',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Error';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_HOSPITAL_USER_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Update user error',
            description: errorMessage,
          });
        })
        .then(() => done());
    } else {
      axios.post(HOSPITAL_USERS_URL, hospitalUserForm)
        .then(() => {
          dispatch({ type: 'HIDE_HOSPITAL_USER_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_HOSPITAL_USER_LOGIC' });
          dispatch({ type: 'FETCH_HOSPITAL_USERS_LOGIC' });
          notification.success({
            message: 'Create user success',
            description: 'Success saving user',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Error';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_HOSPITAL_USER_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Create user error',
            description: errorMessage,
          });
        })
        .then(() => done());
    }
  },
});

const deleteHospitalUserLogic = createLogic({
  type: 'DELETE_HOSPITAL_USER_LOGIC',
  process({ getState, action }, dispatch, done) {
    axios.delete(`${HOSPITAL_USERS_URL}/${action.payload.id}`)
      .then(resp => resp.data)
      .then(() => {
        notification.success({
          message: 'Delete user success',
          description: 'Success deleting user',
        });
        dispatch({ type: 'FETCH_HOSPITAL_USERS_LOGIC' });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Delete user error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const hospitalUserPageChangedLogic = createLogic({
  type: 'HOSPITAL_USER_PAGE_CHANGED_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'HOSPITAL_USER_CURRENT_PAGE_CHANGED', payload: action.payload });
    dispatch({ type: 'FETCH_HOSPITAL_USERS_LOGIC' });
    done();
  },
});

export default [
  fetchHospitalUsersLogic,
  editHospitalUserLogic,
  cancelEditHospitalUserLogic,
  saveHospitalUserLogic,
  deleteHospitalUserLogic,
  hospitalUserPageChangedLogic,
];
