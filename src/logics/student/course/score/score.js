import { createLogic } from 'redux-logic';
import axios from 'axios';
import _ from 'lodash';
import notification from 'antd/lib/notification';
import Constant from '../../../../Constant';
import { validateExist } from '../../../../utils/validation';

const COURSES_URL = `${Constant.serverUrl}/api/courses`;
const SCORES_URL = `${Constant.serverUrl}/api/scores`;
const SCORE_TYPES_URL = `${Constant.serverUrl}/api/scoretypes`;

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'scoreValue':
    case 'scoreType':
    case 'scoreDate':
      result = validateExist(key, value);
      break;
    default:
      break;
  }
  return result;
};

const fetchScoresLogic = createLogic({
  type: 'FETCH_SCORES_LOGIC',
  cancelType: 'CANCEL_FETCH_SCORES_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    // const search = getState().scoreReducers.scoreSearch;
    // const paramameters = search ? { params: { ...search } } : {};
    const courseId = getState().studentReducers.courseForm.id.value;
    dispatch({ type: 'SCORE_LOADING_START' });
    axios.get(`${COURSES_URL}/${courseId}/scores`)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'SCORE_LOADING_FINISH' });
        dispatch({ type: 'FETCH_SCORES_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'SCORE_LOADING_FINISH' });
        notification.error({
          message: 'Fetch scores error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const fetchScoreTypessLogic = createLogic({
  type: 'FETCH_SCORE_TYPES_LOGIC',
  cancelType: 'CANCEL_FETCH_SCORE_TYPES_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    axios.get(SCORE_TYPES_URL)
      .then(resp => resp.data)
      .then((data) => {
        dispatch({ type: 'FETCH_SCORE_TYPES_SUCCESS', payload: data });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Fetch score types error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

const editScoreLogic = createLogic({
  type: 'EDIT_SCORE_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_SCORE_FORM' });
    dispatch({ type: 'SHOW_SCORE_WINDOW' });
    done();
  },
});

const cancelEditScoreLogic = createLogic({
  type: 'CANCEL_EDIT_SCORE_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'CLEAR_SCORE_FORM' });
    dispatch({ type: 'HIDE_SCORE_WINDOW' });
    done();
  },
});

const saveScoreLogic = createLogic({
  type: 'SAVE_SCORE_LOGIC',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const scoreForm = { ...getState().studentReducers.scoreForm };
    const validationResult = {};
    const keys = _.keys(scoreForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (key !== 'id') {
        const value = scoreForm[key].value;
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
      reject({ type: 'SHOW_SCORE_FORM_VALIDATION_ERRORS', payload: validationResult, error: true });
    }
  },
  process({ getState, action }, dispatch, done) {
    const scoreForm = _.mapValues({ ...getState().studentReducers.scoreForm }, 'value');
    const courseId = getState().studentReducers.courseForm.id.value;
    dispatch({ type: 'SHOW_SCORE_WINDOW_CONFIRM_LOADING' });

    if (scoreForm.id) {
      axios.put(`${SCORES_URL}/${scoreForm.id}`, scoreForm)
        .then(() => {
          dispatch({ type: 'HIDE_SCORE_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_SCORE_LOGIC' });
          dispatch({ type: 'FETCH_SCORES_LOGIC' });
          notification.success({
            message: 'Update score success',
            description: 'Success saving score',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. Scorename must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_SCORE_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Update score error',
            description: errorMessage,
          });
        })
        .then(() => done());
    } else {
      axios.post(`${COURSES_URL}/${courseId}/scores`, scoreForm)
        .then(() => {
          dispatch({ type: 'HIDE_SCORE_WINDOW_CONFIRM_LOADING' });
          dispatch({ type: 'CANCEL_EDIT_SCORE_LOGIC' });
          dispatch({ type: 'FETCH_SCORES_LOGIC' });
          notification.success({
            message: 'Create score success',
            description: 'Success saving score',
          });
        })
        .catch((err) => {
          let errorMessage = '';
          if (err.response) {
            if (err.response.status === 500) {
              errorMessage = 'Ex. Scorename must be unique';
            } else {
              errorMessage = `Status: ${err.response.status}`;
            }
          } else if (err.request) {
            errorMessage = 'Connection error.';
          } else {
            errorMessage = err.message;
          }
          dispatch({ type: 'HIDE_SCORE_WINDOW_CONFIRM_LOADING' });
          notification.error({
            message: 'Create score error',
            description: errorMessage,
          });
        })
        .then(() => done());
    }
  },
});

const deleteScoreLogic = createLogic({
  type: 'DELETE_SCORE_LOGIC',
  process({ getState, action }, dispatch, done) {
    axios.delete(`${SCORES_URL}/${action.payload.id}`)
      .then(resp => resp.data)
      .then(() => {
        notification.success({
          message: 'Delete score success',
          description: 'Success deleting score',
        });
        dispatch({ type: 'FETCH_SCORES_LOGIC' });
      })
      .catch((err) => {
        console.error(err);
        notification.error({
          message: 'Delete score error',
          description: 'Please check internet connection.',
        });
      })
      .then(() => done());
  },
});

const scorePageChangedLogic = createLogic({
  type: 'SCORE_PAGE_CHANGED_LOGIC',
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'SCORE_CURRENT_PAGE_CHANGED', payload: action.payload });
    dispatch({ type: 'FETCH_SCORES_LOGIC' });
    done();
  },
});

export default [
  fetchScoresLogic,
  editScoreLogic,
  cancelEditScoreLogic,
  saveScoreLogic,
  deleteScoreLogic,
  scorePageChangedLogic,
  fetchScoreTypessLogic,
];
