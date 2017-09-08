const defaultState = {
  rows: [],
  count: 0,
};

const preTests = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_PRE_TESTS_SUCCESS':
      return { ...state, rows: action.payload.rows, count: action.payload.count };
    default:
      return state;
  }
};

export default preTests;
