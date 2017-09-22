import { createLogic } from 'redux-logic';
import _ from 'lodash';
import { validateLength } from '../../utils/validation';

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

const tutorFormChangedLogic = createLogic({
  type: 'TUTOR_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_TUTOR_FORM', payload: result });
    done();
  },
});

const loadTutorFormLogic = createLogic({
  type: 'LOAD_TUTOR_TO_FORM_LOGIC',
  process({ getState, action }, dispatch, done) {
    const tutor = action.payload;
    const tutorForm = {
      id: {
        value: tutor.id,
      },
      code: {
        value: tutor.code,
      },
      name: {
        value: tutor.name,
      },
    };
    const validationResult = {};
    const keys = _.keys(tutorForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = tutorForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'EDIT_TUTOR_LOGIC' });
    dispatch({ type: 'LOAD_TUTOR', payload: validationResult });
    done();
  },
});

export default [
  tutorFormChangedLogic,
  loadTutorFormLogic,
];
