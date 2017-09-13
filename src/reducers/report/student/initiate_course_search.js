import * as actions from '../../../actions/ActionType';

const defaultState = {
  searchText: '',
  pageSize: 10,
  currentPage: 1,
  loading: false,
  dateRange: [],
};

const initiateCourseSearch = (state = defaultState, action) => {
  switch (action.type) {
    case actions.report.student.initiateCourse.list.search.textChanged: {
      return { ...state, searchText: action.payload };
    }
    case actions.report.student.initiateCourse.list.search.dateRangeChanged: {
      return { ...state, dateRange: action.payload };
    }
    case actions.report.student.initiateCourse.list.search.pageChanged: {
      return { ...state, currentPage: action.payload };
    }
    case actions.report.student.initiateCourse.list.loadingStart: {
      return { ...state, loading: true };
    }
    case actions.report.student.initiateCourse.list.loadingFinish: {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default initiateCourseSearch;
