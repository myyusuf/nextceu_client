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

export const getStudents = filter => (
  {
    type: 'FETCH_STUDENTS',
    payload: {
      filter,
    },
  }
);

export const deleteStudent = student => (
  {
    type: 'DELETE_STUDENT',
    student,
  }
);
