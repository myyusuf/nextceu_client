const defaultState = {
  searchText: '',
  loading: false,
};

const userSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'USER_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'USER_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'USER_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default userSearch;
