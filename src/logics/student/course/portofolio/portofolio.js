import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../../../Constant';
import { validateExist } from '../../../../utils/validation';

const COURSES_URL = `${Constant.serverUrl}/api/courses`;
const PORTOFOLIOS_URL = `${Constant.serverUrl}/api/portofolios`;
const PORTOFOLIO_TYPES_URL = `${Constant.serverUrl}/api/portofoliotypes`;

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'portofolioType':
    case 'portofolioDate':
      result = validateExist(key, value);
      break;
    default:
      break;
  }
  return result;
};

const fetchPortofoliosLogic = createLogic({
  type: 'FETCH_PORTOFOLIOS_LOGIC',
  cancelType: 'CANCEL_FETCH_PORTOFOLIOS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    // const search = getState().portofolioReducers.portofolioSearch;
    // const paramameters = search ? { params: { ...search } } : {};
    const courseId = getState().studentReducers.courseForm.id.value;
    dispatch({ type: 'PORTOFOLIO_LOADING_START' });
    axios.get(`${COURSES_URL}/${courseId}/portofolios`)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'PORTOFOLIO_LOADING_FINISH' });
        dispatch({ type: 'FETCH_PORTOFOLIOS_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'PORTOFOLIO_LOADING_FINISH' });
        notification.error({
          message: 'Fetch portofolios error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const fetchPortofolioTypessLogic = createLogic({
  type: 'FETCH_PORTOFOLIO_TYPES_LOGIC',
  cancelType: 'CANCEL_FETCH_PORTOFOLIO_TYPES_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    axios.get(PORTOFOLIO_TYPES_URL)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'FETCH_PORTOFOLIO_TYPES_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Fetch portofolio types error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const editPortofolioLogic = createLogic({
  type: 'EDIT_PORTOFOLIO_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_PORTOFOLIO_FORM' });
    dispatch({ type: 'SHOW_PORTOFOLIO_WINDOW' });
    done();
  },
});

const cancelEditPortofolioLogic = createLogic({
  type: 'CANCEL_EDIT_PORTOFOLIO_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_PORTOFOLIO_FORM' });
    dispatch({ type: 'HIDE_PORTOFOLIO_WINDOW' });
    done();
  },
});

const savePortofolioLogic = createLogic({
  type: 'SAVE_PORTOFOLIO_LOGIC',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const portofolioForm = { ...getState().studentReducers.portofolioForm };
    const validationResult = {};
    const keys = _.keys(portofolioForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = portofolioForm[key].value;
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
      reject({ type: 'SHOW_PORTOFOLIO_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const portofolioForm = _.mapValues({ ...getState().studentReducers.portofolioForm }, 'value');
    const courseId = getState().studentReducers.courseForm.id.value;
    dispatch({ type: 'SHOW_PORTOFOLIO_WINDOW_CONFIRM_LOADING' });

    if (portofolioForm.id) {
      axios.put(`${PORTOFOLIOS_URL}/${portofolioForm.id}`, portofolioForm)
        .then(() => {
          dispatch({ type: 'HIDE_PORTOFOLIO_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_PORTOFOLIO_LOGIC' });
          dispatch({ type: 'FETCH_PORTOFOLIOS_LOGIC' });
          notification.success({
            message: 'Update portofolio success',
            description: 'Success saving portofolio',
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
          dispatch({ type: 'HIDE_PORTOFOLIO_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Update portofolio error',
            description: errorMessage,
          });
        })
        .then(() => done());
    } else {
      axios.post(`${COURSES_URL}/${courseId}/portofolios`, portofolioForm)
        .then(() => {
          dispatch({ type: 'HIDE_PORTOFOLIO_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_PORTOFOLIO_LOGIC' });
          dispatch({ type: 'FETCH_PORTOFOLIOS_LOGIC' });
          notification.success({
            message: 'Create portofolio success',
            description: 'Success saving portofolio',
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
          dispatch({ type: 'HIDE_PORTOFOLIO_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Create portofolio error',
            description: errorMessage,
          });
        })
        .then(() => done());
    }
  },
});

const deletePortofolioLogic = createLogic({
  type: 'DELETE_PORTOFOLIO_LOGIC',
  process({ getState, action }, dispatch, done) {
    axios.delete(`${PORTOFOLIOS_URL}/${action.payload.id}`)
      .then(resp => resp.data)
      .then(() => {
        notification.success({
          message: 'Delete portofolio success',
          description: 'Success deleting portofolio',
        });
        dispatch({ type: 'FETCH_PORTOFOLIOS_LOGIC' });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Delete portofolio error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const portofolioPageChangedLogic = createLogic({
  type: 'PORTOFOLIO_PAGE_CHANGED_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'PORTOFOLIO_CURRENT_PAGE_CHANGED', payload: action.payload });
    dispatch({ type: 'FETCH_PORTOFOLIOS_LOGIC' });
    done();
  },
});

export default [
  fetchPortofoliosLogic,
  editPortofolioLogic,
  cancelEditPortofolioLogic,
  savePortofolioLogic,
  deletePortofolioLogic,
  portofolioPageChangedLogic,
  fetchPortofolioTypessLogic,
];
