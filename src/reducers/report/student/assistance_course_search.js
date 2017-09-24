import * as actions from '../../../actions/ActionType';

const defaultState = {
  searchText: '',
  pageSize: 10,
  currentPage: 1,
  loading: false,
  dateRange: [],
};

const assistanceCourseSearch = (state = defaultState, action) => {
  switch (action.type) {
    case actions.report.student.assistanceCourse.list.search.textChanged: {
      return { ...state, searchText: action.payload };
    }
    case actions.report.student.assistanceCourse.list.search.dateRangeChanged: {
      return { ...state, dateRange: action.payload };
    }
    case actions.report.student.assistanceCourse.list.search.pageChanged: {
      return { ...state, currentPage: action.payload };
    }
    case actions.report.student.assistanceCourse.list.loadingStart: {
      return { ...state, loading: true };
    }
    case actions.report.student.assistanceCourse.list.loadingFinish: {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default assistanceCourseSearch;
