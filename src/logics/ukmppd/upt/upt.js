import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../../Constant';
import { mathRandom } from '../../../utils/random';
import { validateLength } from '../../../utils/validation';

const UPTS_URL = `${Constant.serverUrl}/api/kompretypes`;

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

const fetchUptsLogic = createLogic({
  type: 'FETCH_UPTS_LOGIC',
  cancelType: 'CANCEL_FETCH_UPTS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().ukmppdReducers.uptSearch;
    const paramameters = search ? { params: { ...search, r: mathRandom() } } : {};
    dispatch({ type: 'UPT_LOADING_START' });
    axios.get(UPTS_URL, paramameters)
      .then(resp => resp.data)
      .then((upts) => {
        dispatch({ type: 'UPT_LOADING_FINISH' });
        dispatch({ type: 'FETCH_UPTS_SUCCESS', payload: upts });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'UPT_LOADING_FINISH' });
        notification.error({
          message: 'Fetch types error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const fetchAllUptsLogic = createLogic({
  type: 'FETCH_ALL_UPTS_LOGIC',
  cancelType: 'CANCEL_FETCH_ALL_UPTS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    axios.get(UPTS_URL, { params: { r: mathRandom() } })
      .then(resp => resp.data)
      .then((upts) => {
        dispatch({ type: 'FETCH_UPTS_SUCCESS', payload: upts });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Fetch types error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const editUptLogic = createLogic({
  type: 'EDIT_UPT_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_UPT_FORM' });
    dispatch({ type: 'SHOW_UPT_WINDOW' });
    done();
  },
});

const cancelAddUptLogic = createLogic({
  type: 'CANCEL_EDIT_UPT_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_UPT_FORM' });
    dispatch({ type: 'HIDE_UPT_WINDOW' });
    done();
  },
});

const saveUptLogic = createLogic({
  type: 'SAVE_UPT_LOGIC',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const uptForm = { ...getState().ukmppdReducers.uptForm };
    const validationResult = {};
    const keys = _.keys(uptForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = uptForm[key].value;
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
      reject({ type: 'SHOW_UPT_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const uptForm = _.mapValues({ ...getState().ukmppdReducers.uptForm }, 'value');
    dispatch({ type: 'SHOW_UPT_WINDOW_CONFIRM_LOADING' });

    if (uptForm.id) {
      axios.put(`${UPTS_URL}/${uptForm.id}`, uptForm)
        .then(() => {
          dispatch({ type: 'HIDE_UPT_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_UPT_LOGIC' });
          dispatch({ type: 'FETCH_UPTS_LOGIC' });
          notification.success({
            message: 'Update type success',
            description: 'Success saving type',
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
          dispatch({ type: 'HIDE_UPT_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Update type error',
            description: errorMessage,
          });
        })
        .then(() => done());
    } else {
      axios.post(UPTS_URL, uptForm)
        .then(() => {
          dispatch({ type: 'HIDE_UPT_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_UPT_LOGIC' });
          dispatch({ type: 'FETCH_UPTS_LOGIC' });
          notification.success({
            message: 'Create type success',
            description: 'Success saving type',
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
          dispatch({ type: 'HIDE_UPT_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Create upt error',
            description: errorMessage,
          });
        })
        .then(() => done());
    }
  },
});

const deleteUptLogic = createLogic({
  type: 'DELETE_UPT_LOGIC',
  process({ getState, action }, dispatch, done) {
    axios.delete(`${UPTS_URL}/${action.payload.id}`)
      .then(resp => resp.data)
      .then(() => {
        notification.success({
          message: 'Delete type success',
          description: 'Success deleting type',
        });
        dispatch({ type: 'FETCH_UPTS_LOGIC' });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Delete type error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

export default [
  fetchUptsLogic,
  editUptLogic,
  cancelAddUptLogic,
  saveUptLogic,
  deleteUptLogic,
  fetchAllUptsLogic,
];
