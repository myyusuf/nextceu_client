const defaultState = {
  searchText: '',
  pageSize: 10,
  currentPage: 1,
  loading: false,
};

const supervisorSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'SUPERVISOR_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'SUPERVISOR_CURRENT_PAGE_CHANGED': {
      return { ...state, currentPage: action.payload };
    }
    case 'SUPERVISOR_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'SUPERVISOR_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default supervisorSearch;
