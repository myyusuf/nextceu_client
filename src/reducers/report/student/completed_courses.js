const defaultState = {
  rows: [],
  count: 0,
};

const completedCourses = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_COMPLETED_COURSES_SUCCESS':
      return { ...state, rows: action.payload.rows, count: action.payload.count };
    default:
      return state;
  }
};

export default completedCourses;
