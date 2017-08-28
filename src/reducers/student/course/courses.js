const defaultState = [];

const courses = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_COURSES_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default courses;
