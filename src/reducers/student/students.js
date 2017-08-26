const defaultState = {
  rows: [],
  count: 0,
};

const students = (state = defaultState, action) => {
  switch (action.type) {
    case 'SELECT_STUDENT': {
      const newRows = state.rows.map((student) => {
        if (student.id === action.student.id) {
          return { ...student, selected: true };
        }
        return { ...student, selected: false };
      });
      return { ...state, rows: newRows };
    }
    case 'FETCH_STUDENTS_SUCCESS':
      return { ...state, rows: action.payload.rows, count: action.payload.count };
    default:
      return state;
  }
};

export default students;
