import { createLogic } from 'redux-logic';
import _ from 'lodash';
import moment from 'moment';
import { validateExist } from '../../../../utils/validation';

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

const scoreFormChangedLogic = createLogic({
  type: 'SCORE_FORM_CHANGED_LOGIC',
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

const loadUserFormLogic = createLogic({
  type: 'LOAD_SCORE_TO_FORM_LOGIC',
  process({ getState, action }, dispatch, done) {
    const score = action.payload;
    const scoreTypeId = score.ScoreType ? score.ScoreType.id : undefined;
    if (score.scoreDate) score.scoreDate = moment(score.scoreDate);
    const scoreForm = {
      id: {
        value: score.id,
      },
      scoreValue: {
        value: score.scoreValue,
      },
      scoreType: {
        value: scoreTypeId,
      },
      scoreDate: {
        value: score.scoreDate,
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

    dispatch({ type: 'EDIT_SCORE_LOGIC' });
    dispatch({ type: 'LOAD_SCORE', payload: validationResult });
    done();
  },
});

export default [
  scoreFormChangedLogic,
  loadUserFormLogic,
];
