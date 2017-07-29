export const addStudent = (newStudent) => {
  return {
    type: 'ADD_STUDENT',
    student: newStudent,
  };
}

export const selectStudent = (student) => {
  return {
    type: 'SELECT_STUDENT',
    student,
  };
}