export const addCourse = newCourse => (
  {
    type: 'ADD_COURSE',
    course: newCourse,
  }
);

export const selectCourse = course => (
  {
    type: 'SELECT_COURSE',
    course,
  }
);

export const loadCourses = courses => (
  {
    type: 'LOAD_COURSES',
    courses,
  }
);

export const fetchCourses = studentId => (
  {
    type: 'FETCH_COURSES',
    studentId,
  }
);

export const cancelFetchCourses = () => (
  {
    type: 'CANCEL_FETCH_COURSES',
  }
);
