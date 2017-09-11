import { createLogic } from 'redux-logic';
import _ from 'lodash';
import { validateLength } from '../../../utils/validation';

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

const uptFormChangedLogic = createLogic({
  type: 'UPT_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_UPT_FORM', payload: result });
    done();
  },
});

const loadUptFormLogic = createLogic({
  type: 'LOAD_UPT_TO_FORM_LOGIC',
  process({ getState, action }, dispatch, done) {
    const upt = action.payload;
    const uptForm = {
      id: {
        value: upt.id,
      },
      code: {
        value: upt.code,
      },
      name: {
        value: upt.name,
      },
    };
    const validationResult = {};
    const keys = _.keys(uptForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = uptForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'EDIT_UPT_LOGIC' });
    dispatch({ type: 'LOAD_UPT', payload: validationResult });
    done();
  },
});

export default [
  uptFormChangedLogic,
  loadUptFormLogic,
];
