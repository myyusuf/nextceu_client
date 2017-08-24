const defaultState = [];

const hospitalStudents = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_HOSPITAL_STUDENTS_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default hospitalStudents;
