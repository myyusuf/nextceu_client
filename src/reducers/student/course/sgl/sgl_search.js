const defaultState = {
  searchText: '',
  loading: false,
};

const sglSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'SGL_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'SGL_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'SGL_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default sglSearch;
