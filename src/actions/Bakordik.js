export default {
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
