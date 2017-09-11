const defaultState = {
  searchText: '',
  loading: false,
};

const kompreSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'KOMPRE_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'KOMPRE_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'KOMPRE_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default kompreSearch;
