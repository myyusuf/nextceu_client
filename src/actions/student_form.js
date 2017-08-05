export const studentFormChanged = value => (
  {
    type: 'STUDENT_FORM_CHANGED',
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
