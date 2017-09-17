import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../../../Constant';
import { validateExist } from '../../../../utils/validation';

const COURSES_URL = `${Constant.serverUrl}/api/courses`;
const SGLS_URL = `${Constant.serverUrl}/api/sgls`;
const SGL_TYPES_URL = `${Constant.serverUrl}/api/sgltypes`;

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'sglType':
    case 'pengampu':
    case 'sglDate':
      result = validateExist(key, value);
      break;
    default:
      break;
  }
  return result;
};

const fetchSglsLogic = createLogic({
  type: 'FETCH_SGLS_LOGIC',
  cancelType: 'CANCEL_FETCH_SGLS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    // const search = getState().sglReducers.sglSearch;
    // const paramameters = search ? { params: { ...search } } : {};
    const courseId = getState().studentReducers.courseForm.id.value;
    dispatch({ type: 'SGL_LOADING_START' });
    axios.get(`${COURSES_URL}/${courseId}/sgls`)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'SGL_LOADING_FINISH' });
        dispatch({ type: 'FETCH_SGLS_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'SGL_LOADING_FINISH' });
        notification.error({
          message: 'Fetch sgls error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const fetchSglTypessLogic = createLogic({
  type: 'FETCH_SGL_TYPES_LOGIC',
  cancelType: 'CANCEL_FETCH_SGL_TYPES_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    axios.get(SGL_TYPES_URL)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'FETCH_SGL_TYPES_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Fetch sgl types error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const editSglLogic = createLogic({
  type: 'EDIT_SGL_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_SGL_FORM' });
    dispatch({ type: 'SHOW_SGL_WINDOW' });
    done();
  },
});

const cancelEditSglLogic = createLogic({
  type: 'CANCEL_EDIT_SGL_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_SGL_FORM' });
    dispatch({ type: 'HIDE_SGL_WINDOW' });
    done();
  },
});

const saveSglLogic = createLogic({
  type: 'SAVE_SGL_LOGIC',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const sglForm = { ...getState().studentReducers.sglForm };
    const validationResult = {};
    const keys = _.keys(sglForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = sglForm[key].value;
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
      reject({ type: 'SHOW_SGL_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const sglForm = _.mapValues({ ...getState().studentReducers.sglForm }, 'value');
    const courseId = getState().studentReducers.courseForm.id.value;
    dispatch({ type: 'SHOW_SGL_WINDOW_CONFIRM_LOADING' });

    if (sglForm.id) {
      axios.put(`${SGLS_URL}/${sglForm.id}`, sglForm)
        .then(() => {
          dispatch({ type: 'HIDE_SGL_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_SGL_LOGIC' });
          dispatch({ type: 'FETCH_SGLS_LOGIC' });
          notification.success({
            message: 'Update sgl success',
            description: 'Success saving sgl',
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
          dispatch({ type: 'HIDE_SGL_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Update sgl error',
            description: errorMessage,
          });
        })
        .then(() => done());
    } else {
      axios.post(`${COURSES_URL}/${courseId}/sgls`, sglForm)
        .then(() => {
          dispatch({ type: 'HIDE_SGL_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_SGL_LOGIC' });
          dispatch({ type: 'FETCH_SGLS_LOGIC' });
          notification.success({
            message: 'Create sgl success',
            description: 'Success saving sgl',
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
          dispatch({ type: 'HIDE_SGL_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Create sgl error',
            description: errorMessage,
          });
        })
        .then(() => done());
    }
  },
});

const deleteSglLogic = createLogic({
  type: 'DELETE_SGL_LOGIC',
  process({ getState, action }, dispatch, done) {
    axios.delete(`${SGLS_URL}/${action.payload.id}`)
      .then(resp => resp.data)
      .then(() => {
        notification.success({
          message: 'Delete sgl success',
          description: 'Success deleting sgl',
        });
        dispatch({ type: 'FETCH_SGLS_LOGIC' });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Delete sgl error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const sglPageChangedLogic = createLogic({
  type: 'SGL_PAGE_CHANGED_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'SGL_CURRENT_PAGE_CHANGED', payload: action.payload });
    dispatch({ type: 'FETCH_SGLS_LOGIC' });
    done();
  },
});

export default [
  fetchSglsLogic,
  editSglLogic,
  cancelEditSglLogic,
  saveSglLogic,
  deleteSglLogic,
  sglPageChangedLogic,
  fetchSglTypessLogic,
];
