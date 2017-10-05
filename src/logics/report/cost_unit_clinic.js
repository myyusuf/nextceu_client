import { createLogic } from 'redux-logic';
import axios from 'axios';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';
import { mathRandom } from '../../utils/random';

const COST_UNITS_CLINIC_URL = `${Constant.serverUrl}/api/reports/costunitsclinic`;
const fetchCostUnitsClinicLogic = createLogic({
  type: 'FETCH_COST_UNITS_CLINIC_LOGIC',
  cancelType: 'CANCEL_FETCH_COST_UNITS_CLINIC_LOGIC',
  latest: true,
  process({ getState, action }, dispatch, done) {
    const search = getState().reportReducers.costUnitSearchClinic;
    const paramameters = search ? { params: { ...search, r: mathRandom() } } : {};
    dispatch({ type: 'COST_UNIT_CLINIC_LOADING_START' });
    axios.get(COST_UNITS_CLINIC_URL, paramameters)
      .then(resp => resp.data)
      .then((roles) => {
        dispatch({ type: 'COST_UNIT_CLINIC_LOADING_FINISH' });
        dispatch({ type: 'FETCH_COST_UNITS_CLINIC_SUCCESS', payload: roles });
      })
      .catch((err) => {
        console.error(err);
        dispatch({ type: 'COST_UNIT_CLINIC_LOADING_FINISH' });
        notification.error({
          message: 'Fetch cost unit error',
          description: 'Connection error.',
        });
      })
      .then(() => done());
  },
});

export default [
  fetchCostUnitsClinicLogic,
];
