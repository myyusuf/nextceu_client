const defaultState = {
  searchText: '',
  loading: false,
};

const portofolioSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'PORTOFOLIO_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'PORTOFOLIO_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'PORTOFOLIO_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default portofolioSearch;
