const defaultState = [];

const costUnits = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_COST_UNITS_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default costUnits;
