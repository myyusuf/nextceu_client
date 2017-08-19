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

export const editStudent = student => (
  {
    type: 'LOAD_STUDENT_TO_FORM',
    payload: student,
  }
);

export const filterStudentsByLevelText = level => (
  {
    type: 'FILTER_STUDENTS_BY_LEVEL_LOGIC',
    payload: level,
  }
);

export const filterStudentsBySearchText = searchText => (
  {
    type: 'FILTER_STUDENTS_BY_SEARCH_TEXT_LOGIC',
    payload: searchText,
  }
);
