const defaultState = {
  rows: [],
  count: 0,
};

const seminars = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_SEMINARS_SUCCESS':
      return { ...state, rows: action.payload.rows, count: action.payload.count };
    default:
      return state;
  }
};

export default seminars;
