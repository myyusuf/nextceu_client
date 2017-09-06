import { createLogic } from 'redux-logic';
import _ from 'lodash';
import { validateLength } from '../../../../utils/validation';

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

const cptFormChangedLogic = createLogic({
  type: 'CPT_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_CPT_FORM', payload: result });
    done();
  },
});

const loadCptFormLogic = createLogic({
  type: 'LOAD_CPT_TO_FORM_LOGIC',
  process({ getState, action }, dispatch, done) {
    const cpt = action.payload;
    const cptForm = {
      id: {
        value: cpt.id,
      },
      code: {
        value: cpt.code,
      },
      name: {
        value: cpt.name,
      },
    };
    const validationResult = {};
    const keys = _.keys(cptForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = cptForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'EDIT_CPT_LOGIC' });
    dispatch({ type: 'LOAD_CPT', payload: validationResult });
    done();
  },
});

export default [
  cptFormChangedLogic,
  loadCptFormLogic,
];
