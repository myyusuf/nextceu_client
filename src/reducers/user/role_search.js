const defaultState = {
  searchText: '',
};

const roleSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'ROLE_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    default:
      return state;
  }
};

export default roleSearch;
