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

const roleFormChangedLogic = createLogic({
  type: 'ROLE_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_ROLE_FORM', payload: result });
    done();
  },
});

const loadRoleFormLogic = createLogic({
  type: 'LOAD_ROLE_TO_FORM_LOGIC',
  process({ getState, action }, dispatch, done) {
    const role = action.payload;
    const roleForm = {
      id: {
        value: role.id,
      },
      code: {
        value: role.code,
      },
      name: {
        value: role.name,
      },
    };
    const validationResult = {};
    const keys = _.keys(roleForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = roleForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'EDIT_ROLE_LOGIC' });
    dispatch({ type: 'LOAD_ROLE', payload: validationResult });
    done();
  },
});

export default [
  roleFormChangedLogic,
  loadRoleFormLogic,
];
