const defaultState = {
  searchText: '',
  loading: false,
};

const appPropSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'APP_PROP_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'APP_PROP_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'APP_PROP_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default appPropSearch;
