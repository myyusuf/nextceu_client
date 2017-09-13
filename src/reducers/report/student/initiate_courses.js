const defaultState = {
  rows: [],
  count: 0,
};

const initiateCourses = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_INITIATE_COURSES_SUCCESS':
      return { ...state, rows: action.payload.rows, count: action.payload.count };
    default:
      return state;
  }
};

export default initiateCourses;
