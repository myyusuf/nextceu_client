import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../../../Constant';
import { validateLength } from '../../../../utils/validation';

const PFTS_URL = `${Constant.serverUrl}/api/portofoliotypes`;

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

const fetchPftsLogic = createLogic({
  type: 'FETCH_PFTS_LOGIC',
  cancelType: 'CANCEL_FETCH_PFTS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().studentReducers.pftSearch;
    const paramameters = search ? { params: { ...search } } : {};
    dispatch({ type: 'PFT_LOADING_START' });
    axios.get(PFTS_URL, paramameters)
      .then(resp => resp.data)
      .then((pfts) => {
        dispatch({ type: 'PFT_LOADING_FINISH' });
        dispatch({ type: 'FETCH_PFTS_SUCCESS', payload: pfts });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'PFT_LOADING_FINISH' });
        notification.error({
          message: 'Fetch pfts error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const fetchAllPftsLogic = createLogic({
  type: 'FETCH_ALL_PFTS_LOGIC',
  cancelType: 'CANCEL_FETCH_ALL_PFTS_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    axios.get(PFTS_URL)
      .then(resp => resp.data)
      .then((pfts) => {
        dispatch({ type: 'FETCH_PFTS_SUCCESS', payload: pfts });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Fetch pfts error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const editPftLogic = createLogic({
  type: 'EDIT_PFT_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_PFT_FORM' });
    dispatch({ type: 'SHOW_PFT_WINDOW' });
    done();
  },
});

const cancelAddPftLogic = createLogic({
  type: 'CANCEL_EDIT_PFT_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_PFT_FORM' });
    dispatch({ type: 'HIDE_PFT_WINDOW' });
    done();
  },
});

const savePftLogic = createLogic({
  type: 'SAVE_PFT_LOGIC',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const pftForm = { ...getState().studentReducers.pftForm };
    const validationResult = {};
    const keys = _.keys(pftForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = pftForm[key].value;
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
      reject({ type: 'SHOW_PFT_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const pftForm = _.mapValues({ ...getState().studentReducers.pftForm }, 'value');
    dispatch({ type: 'SHOW_PFT_WINDOW_CONFIRM_LOADING' });

    if (pftForm.id) {
      axios.put(`${PFTS_URL}/${pftForm.id}`, pftForm)
        .then(() => {
          dispatch({ type: 'HIDE_PFT_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_PFT_LOGIC' });
          dispatch({ type: 'FETCH_PFTS_LOGIC' });
          notification.success({
            message: 'Update pft success',
            description: 'Success saving pft',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. Pft code must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_PFT_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Update pft error',
            description: errorMessage,
          });
        })
        .then(() => done());
    } else {
      axios.post(PFTS_URL, pftForm)
        .then(() => {
          dispatch({ type: 'HIDE_PFT_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_PFT_LOGIC' });
          dispatch({ type: 'FETCH_PFTS_LOGIC' });
          notification.success({
            message: 'Create pft success',
            description: 'Success saving pft',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. Pft code must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_PFT_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Create pft error',
            description: errorMessage,
          });
        })
        .then(() => done());
    }
  },
});

const deletePftLogic = createLogic({
  type: 'DELETE_PFT_LOGIC',
  process({ getState, action }, dispatch, done) {
    axios.delete(`${PFTS_URL}/${action.payload.id}`)
      .then(resp => resp.data)
      .then(() => {
        notification.success({
          message: 'Delete pft success',
          description: 'Success deleting pft',
        });
        dispatch({ type: 'FETCH_PFTS_LOGIC' });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Delete pft error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

export default [
  fetchPftsLogic,
  editPftLogic,
  cancelAddPftLogic,
  savePftLogic,
  deletePftLogic,
  fetchAllPftsLogic,
];
