import { createLogic } from 'redux-logic';
import _ from 'lodash';
import moment from 'moment';
import { validateLength, validateExist } from '../../utils/validation';

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'code':
    case 'name':
      result = validateLength(key, value, 3);
      break;
    case 'eventDate':
    case 'eventTime':
      result = validateExist(key, value);
      break;
    default:
      break;
  }
  return result;
};

const assistanceFormChangedLogic = createLogic({
  type: 'ASSISTANCE_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_ASSISTANCE_FORM', payload: result });
    done();
  },
});

const loadAssistanceFormLogic = createLogic({
  type: 'LOAD_ASSISTANCE_TO_FORM_LOGIC',
  process({ getState, action }, dispatch, done) {
    const assistance = action.payload;
    const assistanceForm = {
      id: {
        value: assistance.id,
      },
      code: {
        value: assistance.code,
      },
      name: {
        value: assistance.name,
      },
      eventDate: {
        value: moment(assistance.eventDate),
      },
      eventTime: {
        value: moment(assistance.eventTime, 'hh:mm:ss a'),
      },
    };
    const validationResult = {};
    const keys = _.keys(assistanceForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = assistanceForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'EDIT_ASSISTANCE_LOGIC' });
    dispatch({ type: 'LOAD_ASSISTANCE', payload: validationResult });
    done();
  },
});

export default [
  assistanceFormChangedLogic,
  loadAssistanceFormLogic,
];
