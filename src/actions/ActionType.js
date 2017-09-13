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
    initiateXpt: {
      list: {
        search: {
          textChanged: 'report/student/initiateXpt/list/search/textChanged',
          pageChanged: 'report/student/initiateXpt/list/search/pageChanged',
        },
        selection: {
          selectChanged: 'report/student/initiateXpt/list/selection/selectChanged',
        },
      },
      form: {
        changed: 'report/student/initiateXpt/form/changed',
        update: 'report/student/initiateXpt/form/update',
        clear: 'report/student/initiateXpt/form/clear',
      },
      window: {
        open: 'report/student/initiateXpt/window/open',
        close: 'report/student/initiateXpt/window/close',
      },
    },
    completedXpt: {
      form: {
        changed: 'report/student/completedXpt/form/changed',
        update: 'report/student/completedXpt/form/update',
        clear: 'report/student/completedXpt/form/clear',
      },
      window: {
        open: 'report/student/completedXpt/window/open',
        close: 'report/student/completedXpt/window/close',
      },
    },
  },
};
