import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';
import { validateLength } from '../../utils/validation';

const APP_PROPS_URL = `${Constant.serverUrl}/api/roles`;

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'code':
    case 'name':
      result = validateLength(key, value, 3);
      break;
    case 'stringValue':
      result = validateLength(key, value, 1);
      break;
    default:
      break;
  }
  return result;
};

const fetchAppPropsLogic = createLogic({
  type: 'FETCH_APP_PROPS_LOGIC',
  cancelType: 'CANCEL_FETCH_APP_PROPS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().userReducers.roleSearch;
    const paramameters = search ? { params: { ...search } } : {};
    dispatch({ type: 'APP_PROP_LOADING_START' });
    axios.get(APP_PROPS_URL, paramameters)
      .then(resp => resp.data)
      .then((roles) => {
        dispatch({ type: 'APP_PROP_LOADING_FINISH' });
        dispatch({ type: 'FETCH_APP_PROPS_SUCCESS', payload: roles });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'APP_PROP_LOADING_FINISH' });
        notification.error({
          message: 'Fetch application properties error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const fetchAllAppPropsLogic = createLogic({
  type: 'FETCH_ALL_APP_PROPS_LOGIC',
  cancelType: 'CANCEL_FETCH_ALL_APP_PROPS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    axios.get(APP_PROPS_URL)
      .then(resp => resp.data)
      .then((roles) => {
        dispatch({ type: 'FETCH_APP_PROPS_SUCCESS', payload: roles });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Fetch application properties error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const editAppPropLogic = createLogic({
  type: 'EDIT_APP_PROP_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_APP_PROP_FORM' });
    dispatch({ type: 'SHOW_APP_PROP_WINDOW' });
    done();
  },
});

const cancelAddAppPropLogic = createLogic({
  type: 'CANCEL_EDIT_APP_PROP_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_APP_PROP_FORM' });
    dispatch({ type: 'HIDE_APP_PROP_WINDOW' });
    done();
  },
});

const saveAppPropLogic = createLogic({
  type: 'SAVE_APP_PROP_LOGIC',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const roleForm = { ...getState().userReducers.roleForm };
    const validationResult = {};
    const keys = _.keys(roleForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = roleForm[key].value;
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
      reject({ type: 'SHOW_APP_PROP_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const roleForm = _.mapValues({ ...getState().userReducers.roleForm }, 'value');
    dispatch({ type: 'SHOW_APP_PROP_WINDOW_CONFIRM_LOADING' });

    if (roleForm.id) {
      axios.put(`${APP_PROPS_URL}/${roleForm.id}`, roleForm)
        .then(() => {
          dispatch({ type: 'HIDE_APP_PROP_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_APP_PROP_LOGIC' });
          dispatch({ type: 'FETCH_APP_PROPS_LOGIC' });
          notification.success({
            message: 'Update application properties success',
            description: 'Success saving application properties',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. Application properties code must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_APP_PROP_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Update application properties error',
            description: errorMessage,
          });
        })
        .then(() => done());
    } else {
      axios.post(APP_PROPS_URL, roleForm)
        .then(() => {
          dispatch({ type: 'HIDE_APP_PROP_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_APP_PROP_LOGIC' });
          dispatch({ type: 'FETCH_APP_PROPS_LOGIC' });
          notification.success({
            message: 'Create application properties success',
            description: 'Success saving application properties',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. Applicatioin properties code must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_APP_PROP_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Create application properties error',
            description: errorMessage,
          });
        })
        .then(() => done());
    }
  },
});

const deleteAppPropLogic = createLogic({
  type: 'DELETE_APP_PROP_LOGIC',
  process({ getState, action }, dispatch, done) {
    axios.delete(`${APP_PROPS_URL}/${action.payload.id}`)
      .then(resp => resp.data)
      .then(() => {
        notification.success({
          message: 'Delete application properties success',
          description: 'Success deleting application properties',
        });
        dispatch({ type: 'FETCH_APP_PROPS_LOGIC' });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Delete application properties error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

export default [
  fetchAppPropsLogic,
  editAppPropLogic,
  cancelAddAppPropLogic,
  saveAppPropLogic,
  deleteAppPropLogic,
  fetchAllAppPropsLogic,
];
