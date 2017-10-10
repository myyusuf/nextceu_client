const defaultState = {
  searchText: '',
  searchDepartment: undefined,
  loading: false,
};

const smtSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'SMT_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'SMT_SEARCH_DEPARTMENT_CHANGED': {
      return { ...state, searchDepartment: action.payload };
    }
    case 'SMT_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'SMT_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default smtSearch;
