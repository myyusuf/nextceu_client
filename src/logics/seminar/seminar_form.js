import { createLogic } from 'redux-logic';
import _ from 'lodash';
import { validateLength, validateExist } from '../../utils/validation';

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'code':
    case 'name':
      result = validateLength(key, value, 3);
      break;
    case 'eventDate':
      result = validateExist(key, value);
      break;
    default:
      break;
  }
  return result;
};

const seminarFormChangedLogic = createLogic({
  type: 'SEMINAR_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_SEMINAR_FORM', payload: result });
    done();
  },
});

const loadSeminarFormLogic = createLogic({
  type: 'LOAD_SEMINAR_TO_FORM_LOGIC',
  process({ getState, action }, dispatch, done) {
    const seminar = action.payload;
    const seminarForm = {
      id: {
        value: seminar.id,
      },
      code: {
        value: seminar.code,
      },
      name: {
        value: seminar.name,
      },
      eventDate: {
        value: seminar.eventDate,
      },
    };
    const validationResult = {};
    const keys = _.keys(seminarForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = seminarForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'EDIT_SEMINAR_LOGIC' });
    dispatch({ type: 'LOAD_SEMINAR', payload: validationResult });
    done();
  },
});

export default [
  seminarFormChangedLogic,
  loadSeminarFormLogic,
];
