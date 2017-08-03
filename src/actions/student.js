import axios from 'axios';

export const loadStudent = (student) => {
  return {
    type: 'LOAD_STUDENT',
    student,
  };
}

export const getStudent = (id) => {
  // return (dispatch) => {
  //   axios.get(`http://localhost:3300/api/students/${id}`)
  //   .then((response) => {
  //     dispatch(loadStudent(response.data));
  //   });
  //
  // };
  return {
    type: 'FETCH_STUDENT',
    id,
  };
};
