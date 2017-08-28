import { createLogic } from 'redux-logic';
import _ from 'lodash';

const scoreFormChangedLogic = createLogic({
  type: 'SCORE_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
      },
    };
    dispatch({ type: 'UPDATE_SCORE_FORM', payload: result });
    done();
  },
});

const loadCourseFormLogic = createLogic({
  type: 'LOAD_SCORE_TO_FORM_LOGIC',
  process({ getState, action }, dispatch, done) {
    const score = action.payload;
    const scoreForm = {
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
      };
    }

    dispatch({ type: 'LOAD_SCORE', payload: validationResult });
    done();
  },
});

export default [
  scoreFormChangedLogic,
  loadCourseFormLogic,
];
