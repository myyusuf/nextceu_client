export const addStudent = newStudent => (
  {
    type: 'ADD_STUDENT',
    student: newStudent,
  }
);

export const selectStudent = student => (
  {
    type: 'SELECT_STUDENT',
    student,
  }
);

export const loadStudents = students => (
  {
    type: 'LOAD_STUDENTS',
    students,
  }
);

export const getStudents = () => (
  {
    type: 'FETCH_STUDENTS',
  }
);
