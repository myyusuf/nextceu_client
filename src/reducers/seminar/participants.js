const defaultState = {
  rows: [],
  count: 0,
};

const participants = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_PARTICIPANTS_SUCCESS':
      return { ...state, rows: action.payload.rows, count: action.payload.count };
    default:
      return state;
  }
};

export default participants;
