const defaultState = {};

const student = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOAD_STUDENT':
      return action.student;
    case 'FETCH_STUDENT_FULFILLED':
      return action.student;
    default:
      return state;
  }
}

export default student;
