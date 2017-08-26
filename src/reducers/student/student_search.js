const defaultState = {
  level: 1,
  searchText: '',
  pageSize: 10,
  currentPage: 1,
  loading: false,
};

const studentSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'STUDENT_LEVEL_CHANGED': {
      return { ...state, level: action.payload };
    }
    case 'STUDENT_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'STUDENT_CURRENT_PAGE_CHANGED': {
      return { ...state, currentPage: action.payload };
    }
    case 'STUDENT_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'STUDENT_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default studentSearch;
