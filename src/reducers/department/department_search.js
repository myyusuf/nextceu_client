const defaultState = {
  searchText: '',
  loading: false,
};

const departmentSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'DEPARTMENT_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'DEPARTMENT_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'DEPARTMENT_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default departmentSearch;
