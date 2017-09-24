export default {
  student: {
    initiateCourse: {
      fetchCourses: 'report/student/initiateCourse/fetchCourses',
      cancelFetchCourses: 'report/student/initiateCourse/cancelFetchCourses',
      fetchCoursesSuccess: 'report/student/initiateCourse/fetchCoursesSuccess',
      list: {
        loadingStart: 'report/student/initiateCourse/list/loadingStart',
        loadingFinish: 'report/student/initiateCourse/list/loadingFinish',
        search: {
          textChanged: 'report/student/initiateCourse/list/search/textChanged',
          dateRangeChanged: 'report/student/initiateCourse/list/search/dateRangeChanged',
          pageChanged: 'report/student/initiateCourse/list/search/pageChanged',
        },
        selection: {
          selectChanged: 'report/student/initiateCourse/list/selection/selectChanged',
          clear: 'report/student/initiateCourse/list/selection/clear',
        },
      },
    },
    completedCourse: {
      fetchCourses: 'report/student/completedCourse/fetchCourses',
      fetchCoursesSuccess: 'report/student/completedCourse/fetchCoursesSuccess',
    },
    levelCourse: {
      fetchCourses: 'report/student/levelCourse/fetchCourses',
      cancelFetchCourses: 'report/student/levelCourse/cancelFetchCourses',
      fetchCoursesSuccess: 'report/student/levelCourse/fetchCoursesSuccess',
      list: {
        loadingStart: 'report/student/levelCourse/list/loadingStart',
        loadingFinish: 'report/student/levelCourse/list/loadingFinish',
        search: {
          textChanged: 'report/student/levelCourse/list/search/textChanged',
          dateRangeChanged: 'report/student/levelCourse/list/search/dateRangeChanged',
          pageChanged: 'report/student/levelCourse/list/search/pageChanged',
        },
        selection: {
          selectChanged: 'report/student/levelCourse/list/selection/selectChanged',
          clear: 'report/student/levelCourse/list/selection/clear',
        },
      },
    },
    initiateXpt: {
      form: {
        changed: 'report/student/initiateXpt/form/changed',
        update: 'report/student/initiateXpt/form/update',
        showErrors: 'report/student/initiateXpt/form/showErrors',
        clear: 'report/student/initiateXpt/form/clear',
      },
      window: {
        open: 'report/student/initiateXpt/window/open',
        close: 'report/student/initiateXpt/window/close',
        loadingStart: 'report/student/initiateXpt/window/loadingStart',
        loadingFinish: 'report/student/initiateXpt/window/loadingFinish',
      },
      doExport: 'report/student/initiateXpt/doExport',
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
    levelXpt: {
      form: {
        changed: 'report/student/levelXpt/form/changed',
        update: 'report/student/levelXpt/form/update',
        showErrors: 'report/student/levelXpt/form/showErrors',
        clear: 'report/student/levelXpt/form/clear',
      },
      window: {
        open: 'report/student/levelXpt/window/open',
        close: 'report/student/levelXpt/window/close',
        loadingStart: 'report/student/levelXpt/window/loadingStart',
        loadingFinish: 'report/student/levelXpt/window/loadingFinish',
      },
      doExport: 'report/student/levelXpt/doExport',
    },
  },
};
