const defaultState = {
  searchText: '',
  pageSize: 10,
  currentPage: 1,
  loading: false,
};

const tutorSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'TUTOR_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'TUTOR_CURRENT_PAGE_CHANGED': {
      return { ...state, currentPage: action.payload };
    }
    case 'TUTOR_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'TUTOR_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default tutorSearch;
