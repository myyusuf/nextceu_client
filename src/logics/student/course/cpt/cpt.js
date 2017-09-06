import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../../../Constant';
import { validateLength } from '../../../../utils/validation';

const CPTS_URL = `${Constant.serverUrl}/api/courseproblemtypes`;

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

const fetchCptsLogic = createLogic({
  type: 'FETCH_CPTS_LOGIC',
  cancelType: 'CANCEL_FETCH_CPTS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().studentReducers.cptSearch;
    const paramameters = search ? { params: { ...search } } : {};
    dispatch({ type: 'CPT_LOADING_START' });
    axios.get(CPTS_URL, paramameters)
      .then(resp => resp.data)
      .then((cpts) => {
        dispatch({ type: 'CPT_LOADING_FINISH' });
        dispatch({ type: 'FETCH_CPTS_SUCCESS', payload: cpts });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'CPT_LOADING_FINISH' });
        notification.error({
          message: 'Fetch cpts error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const fetchAllCptsLogic = createLogic({
  type: 'FETCH_ALL_CPTS_LOGIC',
  cancelType: 'CANCEL_FETCH_ALL_CPTS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    axios.get(CPTS_URL)
      .then(resp => resp.data)
      .then((cpts) => {
        dispatch({ type: 'FETCH_CPTS_SUCCESS', payload: cpts });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Fetch cpts error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const editCptLogic = createLogic({
  type: 'EDIT_CPT_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_CPT_FORM' });
    dispatch({ type: 'SHOW_CPT_WINDOW' });
    done();
  },
});

const cancelAddCptLogic = createLogic({
  type: 'CANCEL_EDIT_CPT_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_CPT_FORM' });
    dispatch({ type: 'HIDE_CPT_WINDOW' });
    done();
  },
});

const saveCptLogic = createLogic({
  type: 'SAVE_CPT_LOGIC',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const cptForm = { ...getState().studentReducers.cptForm };
    const validationResult = {};
    const keys = _.keys(cptForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = cptForm[key].value;
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
      reject({ type: 'SHOW_CPT_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const cptForm = _.mapValues({ ...getState().studentReducers.cptForm }, 'value');
    dispatch({ type: 'SHOW_CPT_WINDOW_CONFIRM_LOADING' });

    if (cptForm.id) {
      axios.put(`${CPTS_URL}/${cptForm.id}`, cptForm)
        .then(() => {
          dispatch({ type: 'HIDE_CPT_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_CPT_LOGIC' });
          dispatch({ type: 'FETCH_CPTS_LOGIC' });
          notification.success({
            message: 'Update cpt success',
            description: 'Success saving cpt',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. Cpt code must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_CPT_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Update cpt error',
            description: errorMessage,
          });
        })
        .then(() => done());
    } else {
      axios.post(CPTS_URL, cptForm)
        .then(() => {
          dispatch({ type: 'HIDE_CPT_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_CPT_LOGIC' });
          dispatch({ type: 'FETCH_CPTS_LOGIC' });
          notification.success({
            message: 'Create cpt success',
            description: 'Success saving cpt',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. Cpt code must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_CPT_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Create cpt error',
            description: errorMessage,
          });
        })
        .then(() => done());
    }
  },
});

const deleteCptLogic = createLogic({
  type: 'DELETE_CPT_LOGIC',
  process({ getState, action }, dispatch, done) {
    axios.delete(`${CPTS_URL}/${action.payload.id}`)
      .then(resp => resp.data)
      .then(() => {
        notification.success({
          message: 'Delete cpt success',
          description: 'Success deleting cpt',
        });
        dispatch({ type: 'FETCH_CPTS_LOGIC' });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Delete cpt error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

export default [
  fetchCptsLogic,
  editCptLogic,
  cancelAddCptLogic,
  saveCptLogic,
  deleteCptLogic,
  fetchAllCptsLogic,
];
