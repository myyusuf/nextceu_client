import { createLogic } from 'redux-logic';
import axios from 'axios';
import notification from 'antd/lib/notification';
import _ from 'lodash';
import { validateLength } from '../../../utils/validation';

import Constant from '../../../Constant';

const STUDENTS_URL = `${Constant.serverUrl}/api/scores`;

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'title':
      result = validateLength(key, value, 3);
      break;
    default:
      break;
  }

  return result;
};

const scoreFormChangedLogic = createLogic({
  type: 'SCORE_FORM_CHANGED',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_SCORE_FORM', payload: result });
    done();
  },
});

const saveCourseFormLogic = createLogic({
  type: 'SAVE_SCORE_FORM',
  latest: true,
  validate({ getState, action }, allow, reject) {
    let isFormValid = true;
    const scoreForm = { ...getState().scoreReducers.scoreForm };
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
    const scoreForm = _.mapValues({ ...getState().scoreReducers.scoreForm }, 'value');
    scoreForm.level = 1;

    dispatch({ type: 'SHOW_SCORE_WINDOW_CONFIRM_LOADING' });

    if (scoreForm.id) {
      axios.put(`${STUDENTS_URL}/${scoreForm.id}`, scoreForm)
        .then((scores) => {
          dispatch({ type: 'SAVE_SCORE_FORM_SUCCESS', payload: scores });
        })
        .catch((err) => {
          console.error(err);
          dispatch({ type: 'SAVE_SCORE_FORM_FAILED', payload: err, error: true });
        })
        .then(() => done());
    } else {
      axios.post(STUDENTS_URL, scoreForm)
        .then((scores) => {
          dispatch({ type: 'SAVE_SCORE_FORM_SUCCESS', payload: scores });
        })
        .catch((err) => {
          console.error(err);
          dispatch({ type: 'SAVE_SCORE_FORM_FAILED', payload: err, error: true });
        })
        .then(() => done());
    }
  },
});

const saveCourseFormSuccessLogic = createLogic({
  type: 'SAVE_SCORE_FORM_SUCCESS',
  latest: true,
  process({ getState, action }, dispatch, done) {
    dispatch({ type: 'FETCH_SCORES' });
    notification.success({
      message: 'Save Course Success',
      description: 'Success saving score',
    });
    done();
  },
});

const saveCourseFormFailedLogic = createLogic({
  type: 'SAVE_SCORE_FORM_FAILED',
  latest: true,
  process({ getState, action }, dispatch, done) {
    notification.error({
      message: 'Add Course Error',
      description: 'Error creating new score',
    });
    done();
  },
});

const loadCourseFormLogic = createLogic({
  type: 'LOAD_SCORE_TO_FORM',
  process({ getState, action }, dispatch, done) {
    const score = action.payload;
    const scoreForm = {
      id: {
        value: score.id,
      },
      preTest: {
        value: score.preTest,
      },
      research: {
        value: score.research,
      },
      weeklyDiscussion: {
        value: score.weeklyDiscussion,
      },
      test: {
        value: score.test,
      },
      postTest: {
        value: score.postTest,
      },
    };
    const validationResult = {};
    const keys = _.keys(scoreForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = scoreForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'LOAD_SCORE', payload: validationResult });
    done();
  },
});

export default [
  scoreFormChangedLogic,
  saveCourseFormLogic,
  saveCourseFormSuccessLogic,
  saveCourseFormFailedLogic,
  loadCourseFormLogic,
];
