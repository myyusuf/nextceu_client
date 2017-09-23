const defaultState = {
  rows: [],
  count: 0,
};

const supervisors = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_SUPERVISORS_SUCCESS':
      return { ...state, rows: action.payload.rows, count: action.payload.count };
    default:
      return state;
  }
};

export default supervisors;
