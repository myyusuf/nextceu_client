const defaultState = {
  searchText: '',
  pageSize: 10,
  currentPage: 1,
  loading: false,
};

const participantSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'ASSISTANCE_PARTICIPANT_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'ASSISTANCE_PARTICIPANT_CURRENT_PAGE_CHANGED': {
      return { ...state, currentPage: action.payload };
    }
    case 'ASSISTANCE_PARTICIPANT_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'ASSISTANCE_PARTICIPANT_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default participantSearch;
