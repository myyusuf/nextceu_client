const defaultState = {};

const student = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_STUDENT_SUCCESS':
      return action.payload;
    case 'CLEAR_STUDENT':
      return {};
    default:
      return state;
  }
};

export default student;
