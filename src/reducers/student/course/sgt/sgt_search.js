const defaultState = {
  searchText: '',
  searchDepartment: undefined,
  loading: false,
};

const sgtSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'SGT_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'SGT_SEARCH_DEPARTMENT_CHANGED': {
      return { ...state, searchDepartment: action.payload };
    }
    case 'SGT_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'SGT_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default sgtSearch;
