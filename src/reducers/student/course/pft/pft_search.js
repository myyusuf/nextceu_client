const defaultState = {
  searchText: '',
  loading: false,
};

const pftSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'PFT_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'PFT_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'PFT_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default pftSearch;
