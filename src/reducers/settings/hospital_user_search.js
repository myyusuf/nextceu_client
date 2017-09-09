const defaultState = {
  searchText: '',
  pageSize: 10,
  currentPage: 1,
  loading: false,
};

const hospitalUserSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'HOSPITAL_USER_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'HOSPITAL_USER_CURRENT_PAGE_CHANGED': {
      return { ...state, currentPage: action.payload };
    }
    case 'HOSPITAL_USER_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'HOSPITAL_USER_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default hospitalUserSearch;
