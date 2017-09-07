const defaultState = [];

const courseProblems = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_COURSE_PROBLEMS_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default courseProblems;
