import axios from 'axios';

export const addCourse = (newCourse) => {
  return {
    type: 'ADD_COURSE',
    course: newCourse,
  };
}

export const selectCourse = (course) => {
  return {
    type: 'SELECT_COURSE',
    course,
  };
}

export const loadCourses = (courses) => {
  return {
    type: 'LOAD_COURSES',
    courses,
  };
}

export const getCourses = (studentId) => {
  return (dispatch) => {
    axios.get(`http://localhost:3300/api/students/${studentId}/courses`)
    .then((response) => {
      dispatch(loadCourses(response.data));
    });
  };
};
