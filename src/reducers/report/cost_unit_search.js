const defaultState = {
  searchText: '',
  loading: false,
};

const costUnitSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'COST_UNIT_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'COST_UNIT_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'COST_UNIT_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default costUnitSearch;
