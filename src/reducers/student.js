const defaultState = {};

const student = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOAD_STUDENT':
      return action.student;
    default:
      return state;
  }
}

export default student;
