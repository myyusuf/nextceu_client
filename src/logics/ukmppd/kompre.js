import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';
import { validateExist } from '../../utils/validation';

const COURSES_URL = `${Constant.serverUrl}/api/courses`;
const KOMPRES_URL = `${Constant.serverUrl}/api/kompres`;
const KOMPRE_TYPES_URL = `${Constant.serverUrl}/api/kompretypes`;

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'kompreType':
    case 'kompreDate':
    case 'score':
      result = validateExist(key, value);
      break;
    default:
      break;
  }
  return result;
};

const fetchKompresLogic = createLogic({
  type: 'FETCH_KOMPRES_LOGIC',
  cancelType: 'CANCEL_FETCH_KOMPRES_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    // const search = getState().kompreReducers.kompreSearch;
    // const paramameters = search ? { params: { ...search } } : {};
    const courseId = getState().ukmppdReducers.courseForm.id.value;
    dispatch({ type: 'KOMPRE_LOADING_START' });
    axios.get(`${COURSES_URL}/${courseId}/kompres`)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'KOMPRE_LOADING_FINISH' });
        dispatch({ type: 'FETCH_KOMPRES_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'KOMPRE_LOADING_FINISH' });
        notification.error({
          message: 'Fetch kompres error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const fetchKompreTypessLogic = createLogic({
  type: 'FETCH_KOMPRE_TYPES_LOGIC',
  cancelType: 'CANCEL_FETCH_KOMPRE_TYPES_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    axios.get(KOMPRE_TYPES_URL)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'FETCH_KOMPRE_TYPES_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Fetch kompre types error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const editKompreLogic = createLogic({
  type: 'EDIT_KOMPRE_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_KOMPRE_FORM' });
    dispatch({ type: 'SHOW_KOMPRE_WINDOW' });
    done();
  },
});

const cancelEditKompreLogic = createLogic({
  type: 'CANCEL_EDIT_KOMPRE_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_KOMPRE_FORM' });
    dispatch({ type: 'HIDE_KOMPRE_WINDOW' });
    done();
  },
});

const saveKompreLogic = createLogic({
  type: 'SAVE_KOMPRE_LOGIC',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const kompreForm = { ...getState().ukmppdReducers.kompreForm };
    const validationResult = {};
    const keys = _.keys(kompreForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = kompreForm[key].value;
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
      reject({ type: 'SHOW_KOMPRE_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const kompreForm = _.mapValues({ ...getState().ukmppdReducers.kompreForm }, 'value');
    const courseId = getState().ukmppdReducers.courseForm.id.value;
    dispatch({ type: 'SHOW_KOMPRE_WINDOW_CONFIRM_LOADING' });

    if (kompreForm.id) {
      axios.put(`${KOMPRES_URL}/${kompreForm.id}`, kompreForm)
        .then(() => {
          dispatch({ type: 'HIDE_KOMPRE_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_KOMPRE_LOGIC' });
          dispatch({ type: 'FETCH_KOMPRES_LOGIC' });
          notification.success({
            message: 'Update kompre success',
            description: 'Success saving kompre',
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
          dispatch({ type: 'HIDE_KOMPRE_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Update kompre error',
            description: errorMessage,
          });
        })
        .then(() => done());
    } else {
      axios.post(`${COURSES_URL}/${courseId}/kompres`, kompreForm)
        .then(() => {
          dispatch({ type: 'HIDE_KOMPRE_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_KOMPRE_LOGIC' });
          dispatch({ type: 'FETCH_KOMPRES_LOGIC' });
          notification.success({
            message: 'Create kompre success',
            description: 'Success saving kompre',
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
          dispatch({ type: 'HIDE_KOMPRE_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Create kompre error',
            description: errorMessage,
          });
        })
        .then(() => done());
    }
  },
});

const deleteKompreLogic = createLogic({
  type: 'DELETE_KOMPRE_LOGIC',
  process({ getState, action }, dispatch, done) {
    axios.delete(`${KOMPRES_URL}/${action.payload.id}`)
      .then(resp => resp.data)
      .then(() => {
        notification.success({
          message: 'Delete kompre success',
          description: 'Success deleting kompre',
        });
        dispatch({ type: 'FETCH_KOMPRES_LOGIC' });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Delete kompre error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const komprePageChangedLogic = createLogic({
  type: 'KOMPRE_PAGE_CHANGED_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'KOMPRE_CURRENT_PAGE_CHANGED', payload: action.payload });
    dispatch({ type: 'FETCH_KOMPRES_LOGIC' });
    done();
  },
});

export default [
  fetchKompresLogic,
  editKompreLogic,
  cancelEditKompreLogic,
  saveKompreLogic,
  deleteKompreLogic,
  komprePageChangedLogic,
  fetchKompreTypessLogic,
];
