import axios from 'axios';

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

export const loadStudents = (students) => {
  return {
    type: 'LOAD_STUDENTS',
    students,
  };
}

export const getStudents = () => {
  return (dispatch) => {

    axios.get('http://localhost:3300/api/students')
    .then((response) => {
      console.log(response.data);
      dispatch(loadStudents(response.data));
    });

  };
}