export const addStudent = (newStudent) => {
  return {
    type: 'ADD_STUDENT',
    student: newStudent,
  };
}