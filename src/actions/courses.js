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

export const getCourses = studentId => (
  {
    type: 'FETCH_COURSES',
    studentId,
  }
);
