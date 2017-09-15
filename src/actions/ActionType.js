export const report = {
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
  },
};

export const bakordik = {
  treeSelect: 'bakordik/treeSelect',
  initiateStudent: {
    fetchCourses: 'bakordik/initiateStudent/fetchCourses',
    cancelFetchCourses: 'bakordik/initiateStudent/cancelFetchCourses',
    fetchCoursesSuccess: 'bakordik/initiateStudent/fetchCoursesSuccess',
    list: {
      loadingStart: 'bakordik/initiateCourse/list/loadingStart',
      loadingFinish: 'bakordik/initiateCourse/list/loadingFinish',
      search: {
        textChanged: 'bakordik/initiateCourse/list/search/textChanged',
        dateRangeChanged: 'bakordik/initiateCourse/list/search/dateRangeChanged',
        pageChanged: 'bakordik/initiateCourse/list/search/pageChanged',
      },
      selection: {
        selectChanged: 'bakordik/initiateCourse/list/selection/selectChanged',
        clear: 'bakordik/initiateCourse/list/selection/clear',
      },
    },
  },
};
