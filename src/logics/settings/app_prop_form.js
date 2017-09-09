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
    case 'stringValue':
      result = validateLength(key, value, 1);
      break;
    default:
      break;
  }
  return result;
};

const appPropFormChangedLogic = createLogic({
  type: 'APP_PROP_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_APP_PROP_FORM', payload: result });
    done();
  },
});

const loadAppPropFormLogic = createLogic({
  type: 'LOAD_APP_PROP_TO_FORM_LOGIC',
  process({ getState, action }, dispatch, done) {
    const appProp = action.payload;
    const appPropForm = {
      id: {
        value: appProp.id,
      },
      code: {
        value: appProp.code,
      },
      name: {
        value: appProp.name,
      },
      stringValue: {
        value: appProp.stringValue,
      },
    };
    const validationResult = {};
    const keys = _.keys(appPropForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = appPropForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'EDIT_APP_PROP_LOGIC' });
    dispatch({ type: 'LOAD_APP_PROP', payload: validationResult });
    done();
  },
});

export default [
  appPropFormChangedLogic,
  loadAppPropFormLogic,
];
