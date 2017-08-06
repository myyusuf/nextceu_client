const defaultState = [];

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
          ? { ...student, selected: true }
          : { ...student, selected: false },
      );
    case 'FETCH_STUDENTS_SUCCESS':
      return action.students;
    default:
      return state;
  }
};

export default students;
