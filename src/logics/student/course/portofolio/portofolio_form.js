import { createLogic } from 'redux-logic';
import _ from 'lodash';
import moment from 'moment';
import { validateExist } from '../../../../utils/validation';

const validate = (key, value) => {
  let result = null;
  switch (key) {
    case 'portofolioType':
    case 'portofolioDate':
      result = validateExist(key, value);
      break;
    default:
      break;
  }
  return result;
};

const portofolioFormChangedLogic = createLogic({
  type: 'PORTOFOLIO_FORM_CHANGED_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const payload = action.payload;
    const result = {
      [payload.key]: {
        value: payload.value,
        ...validate(payload.key, payload.value),
      },
    };
    dispatch({ type: 'UPDATE_PORTOFOLIO_FORM', payload: result });
    done();
  },
});

const loadPortofolioFormLogic = createLogic({
  type: 'LOAD_PORTOFOLIO_TO_FORM_LOGIC',
  process({ getState, action }, dispatch, done) {
    const portofolio = action.payload;
    const portofolioTypeId = portofolio.PortofolioType ?
    portofolio.PortofolioType.id : undefined;
    if (portofolio.portofolioDate) {
      portofolio.portofolioDate = moment(portofolio.portofolioDate);
    }
    const portofolioForm = {
      id: {
        value: portofolio.id,
      },
      portofolioType: {
        value: String(portofolioTypeId),
      },
      portofolioDate: {
        value: portofolio.portofolioDate,
      },
      completed: {
        value: portofolio.completed,
      },
    };
    const validationResult = {};
    const keys = _.keys(portofolioForm);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const value = portofolioForm[key].value;
      validationResult[key] = {
        value,
        ...validate(key, value),
      };
    }

    dispatch({ type: 'EDIT_PORTOFOLIO_LOGIC' });
    dispatch({ type: 'LOAD_PORTOFOLIO', payload: validationResult });
    done();
  },
});

export default [
  portofolioFormChangedLogic,
  loadPortofolioFormLogic,
];
