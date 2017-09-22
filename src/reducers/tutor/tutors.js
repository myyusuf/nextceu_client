const defaultState = {
  rows: [],
  count: 0,
};

const tutors = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_TUTORS_SUCCESS':
      return { ...state, rows: action.payload.rows, count: action.payload.count };
    default:
      return state;
  }
};

export default tutors;
