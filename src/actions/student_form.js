export const updateStudentForm = value => (
  {
    type: 'UPDATE_STUDENT_FORM',
    payload: value,
  }
);

export const resetStudentForm = () => (
  {
    type: 'RESET_STUDENT_FORM',
  }
);

export const createStudent = student => (
  {
    type: 'CREATE_STUDENT',
    payload: student,
  }
);
