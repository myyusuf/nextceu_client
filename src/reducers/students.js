const defaultState = [{
  id: 1,
  name: 'Student Test',
  newSid: '111',
  oldSid: '222',
}];

const students = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_STUDENT':
      const newState = [
        ...state,
        action.student,
      ];

      return newState;
    default:
      return state;
  }
}

export default students;
