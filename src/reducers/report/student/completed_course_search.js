const defaultState = {
  searchText: '',
  pageSize: 10,
  currentPage: 1,
  loading: false,
  dateRange: [],
};

const completedCourseSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'COMPLETED_COURSE_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'COMPLETED_COURSE_SEARCH_DATE_RANGE_CHANGED': {
      return { ...state, dateRange: action.payload };
    }
    case 'COMPLETED_COURSE_CURRENT_PAGE_CHANGED': {
      return { ...state, currentPage: action.payload };
    }
    case 'COMPLETED_COURSE_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'COMPLETED_COURSE_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default completedCourseSearch;
