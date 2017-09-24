import * as actions from '../../../actions/ActionType';

const defaultState = {
  searchText: '',
  pageSize: 10,
  currentPage: 1,
  loading: false,
  dateRange: [],
};

const levelCourseSearch = (state = defaultState, action) => {
  switch (action.type) {
    case actions.report.student.levelCourse.list.search.textChanged: {
      return { ...state, searchText: action.payload };
    }
    case actions.report.student.levelCourse.list.search.dateRangeChanged: {
      return { ...state, dateRange: action.payload };
    }
    case actions.report.student.levelCourse.list.search.pageChanged: {
      return { ...state, currentPage: action.payload };
    }
    case actions.report.student.levelCourse.list.loadingStart: {
      return { ...state, loading: true };
    }
    case actions.report.student.levelCourse.list.loadingFinish: {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default levelCourseSearch;
