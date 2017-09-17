const defaultState = {
  rows: [],
  count: 0,
};

const pengampus = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_PENGAMPUS_SUCCESS':
      return { ...state, rows: action.payload.rows, count: action.payload.count };
    default:
      return state;
  }
};

export default pengampus;
