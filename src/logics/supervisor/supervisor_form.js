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

const supervisorFormChangedLogic = createLogic({
  type: 'SUPERVISOR_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_SUPERVISOR_FORM', payload: result });
    done();
  },
});

const loadSupervisorFormLogic = createLogic({
  type: 'LOAD_SUPERVISOR_TO_FORM_LOGIC',
  process({ getState, action }, dispatch, done) {
    const supervisor = action.payload;
    const supervisorForm = {
      id: {
        value: supervisor.id,
      },
      code: {
        value: supervisor.code,
      },
      name: {
        value: supervisor.name,
      },
    };
    const validationResult = {};
    const keys = _.keys(supervisorForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = supervisorForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'EDIT_SUPERVISOR_LOGIC' });
    dispatch({ type: 'LOAD_SUPERVISOR', payload: validationResult });
    done();
  },
});

export default [
  supervisorFormChangedLogic,
  loadSupervisorFormLogic,
];
