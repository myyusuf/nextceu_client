const defaultState = [];

const costUnitsClinic = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_COST_UNITS_CLINIC_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default costUnitsClinic;
