export const report = {
  student: {
    initiateCourse: {
      fetchCourses: 'report/student/initiateCourse/fetchCourses',
      cancelFetchCourses: 'report/student/initiateCourse/cancelFetchCourses',
      fetchCoursesSuccess: 'report/student/initiateCourse/fetchCoursesSuccess',
      list: {
        loadingStart: 'report/student/initiateCourse/list/loadingStart',
        loadingFinish: 'report/student/initiateCourse/list/loadingFinish',
      },
    },
    completedCourse: {
      fetchCourses: 'report/student/completedCourse/fetchCourses',
      fetchCoursesSuccess: 'report/student/completedCourse/fetchCoursesSuccess',
    },
    completedXpt: {
      form: {
        changed: 'report/student/completedXpt/form/changed',
        clear: 'report/student/completedXpt/form/changed',
      },
    },
  },
};
