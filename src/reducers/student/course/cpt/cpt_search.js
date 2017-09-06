const defaultState = {
  searchText: '',
  loading: false,
};

const cptSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'CPT_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'CPT_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'CPT_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default cptSearch;
