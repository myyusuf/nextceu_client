import { createLogic } from 'redux-logic';
import _ from 'lodash';
import { validateExist } from '../../utils/validation';

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'username':
    case 'password':
      result = validateExist(key, value, 3);
      break;
    default:
      break;
  }
  return result;
};

const loginFormChangedLogic = createLogic({
  type: 'LOGIN_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_LOGIN_FORM', payload: result });
    done();
  },
});

const loadRoleFormLogic = createLogic({
  type: 'LOAD_LOGIN_TO_FORM_LOGIC',
  process({ getState, action }, dispatch, done) {
    const login = action.payload;
    const loginForm = {
      id: {
        value: login.id,
      },
      username: {
        value: login.username,
      },
      password: {
        value: login.password,
      },
    };
    const validationResult = {};
    const keys = _.keys(loginForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = loginForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'EDIT_LOGIN_LOGIC' });
    dispatch({ type: 'LOAD_LOGIN', payload: validationResult });
    done();
  },
});

export default [
  loginFormChangedLogic,
  loadRoleFormLogic,
];
