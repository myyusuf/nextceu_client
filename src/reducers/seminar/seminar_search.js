const defaultState = {
  searchText: '',
  pageSize: 10,
  currentPage: 1,
  loading: false,
};

const seminarSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'SEMINAR_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'SEMINAR_CURRENT_PAGE_CHANGED': {
      return { ...state, currentPage: action.payload };
    }
    case 'SEMINAR_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'SEMINAR_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default seminarSearch;
