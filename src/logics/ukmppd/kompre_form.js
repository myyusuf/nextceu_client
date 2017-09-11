import { createLogic } from 'redux-logic';
import _ from 'lodash';
import moment from 'moment';
import { validateExist } from '../../utils/validation';

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'kompreType':
    case 'kompreDate':
    case 'score':
      result = validateExist(key, value);
      break;
    default:
      break;
  }
  return result;
};

const kompreFormChangedLogic = createLogic({
  type: 'KOMPRE_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_KOMPRE_FORM', payload: result });
    done();
  },
});

const loadKompreFormLogic = createLogic({
  type: 'LOAD_KOMPRE_TO_FORM_LOGIC',
  process({ getState, action }, dispatch, done) {
    const kompre = action.payload;
    const kompreTypeId = kompre.KompreType ?
    kompre.KompreType.id : undefined;
    if (kompre.kompreDate) {
      kompre.kompreDate = moment(kompre.kompreDate);
    }
    const kompreForm = {
      id: {
        value: kompre.id,
      },
      score: {
        value: kompre.score,
      },
      kompreType: {
        value: String(kompreTypeId),
      },
      kompreDate: {
        value: kompre.kompreDate,
      },
      selected: {
        value: kompre.selected,
      },
    };
    const validationResult = {};
    const keys = _.keys(kompreForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = kompreForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'EDIT_KOMPRE_LOGIC' });
    dispatch({ type: 'LOAD_KOMPRE', payload: validationResult });
    done();
  },
});

export default [
  kompreFormChangedLogic,
  loadKompreFormLogic,
];
