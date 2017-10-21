const defaultState = {
  searchText: '',
  searchDepartment: undefined,
  pageSize: 10,
  currentPage: 1,
  loading: false,
};

const pengampuSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'PENGAMPU_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'PENGAMPU_SEARCH_DEPARTMENT_CHANGED': {
      return { ...state, searchDepartment: action.payload };
    }
    case 'PENGAMPU_CURRENT_PAGE_CHANGED': {
      return { ...state, currentPage: action.payload };
    }
    case 'PENGAMPU_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'PENGAMPU_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default pengampuSearch;
