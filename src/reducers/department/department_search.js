const defaultState = {
  searchText: '',
  searchLevel: '1',
  loading: false,
};

const departmentSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'DEPARTMENT_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'DEPARTMENT_SEARCH_LEVEL_CHANGED': {
      return { ...state, searchLevel: action.payload };
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
