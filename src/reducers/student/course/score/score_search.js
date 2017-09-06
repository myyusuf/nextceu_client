const defaultState = {
  searchText: '',
  loading: false,
};

const scoreSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'SCORE_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'SCORE_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'SCORE_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default scoreSearch;
