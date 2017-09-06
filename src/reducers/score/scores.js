const defaultState = {
  rows: [],
  count: 0,
};

const scores = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_SCORES_SUCCESS':
      return { ...state, rows: action.payload.rows, count: action.payload.count };
    default:
      return state;
  }
};

export default scores;
