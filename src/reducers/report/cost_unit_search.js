const defaultState = {
  dateRange: [],
  hospital: null,
  loading: false,
};

const costUnitSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'COST_UNIT_DATE_RANGE_CHANGED': {
      return { ...state, dateRange: action.payload };
    }
    case 'COST_UNIT_HOSPITAL_CHANGED': {
      return { ...state, hospital: action.payload };
    }
    case 'COST_UNIT_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'COST_UNIT_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default costUnitSearch;
