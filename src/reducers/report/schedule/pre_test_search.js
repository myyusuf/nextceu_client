const defaultState = {
  searchText: '',
  pageSize: 10,
  currentPage: 1,
  loading: false,
  dateSelect: null,
};

const preTestSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'PRE_TEST_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'PRE_TEST_SEARCH_DATE_CHANGED': {
      return { ...state, dateSelect: action.payload };
    }
    case 'PRE_TEST_CURRENT_PAGE_CHANGED': {
      return { ...state, currentPage: action.payload };
    }
    case 'PRE_TEST_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'PRE_TEST_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default preTestSearch;
