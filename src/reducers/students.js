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
    case 'SELECT_STUDENT':
      return state.map(student =>
        (student.id === action.student.id)
          ? {...student, selected: true}
          : student
      )
    case 'LOAD_STUDENTS':
      return action.students;
    default:
      return state;
  }
}

export default students;
