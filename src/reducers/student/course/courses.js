const defaultState = [];

const courses = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_COURSE': {
      const newState = [
        ...state,
        action.course,
      ];

      return newState;
    }
    case 'FETCH_COURSES_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default courses;
