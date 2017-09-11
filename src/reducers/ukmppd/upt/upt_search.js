const defaultState = {
  searchText: '',
  loading: false,
};

const uptSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPT_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'UPT_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'UPT_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default uptSearch;
