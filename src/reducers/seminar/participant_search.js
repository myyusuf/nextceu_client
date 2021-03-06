const defaultState = {
  searchText: '',
  pageSize: 10,
  currentPage: 1,
  loading: false,
};

const participantSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'PARTICIPANT_SEARCH_TEXT_CHANGED': {
      return { ...state, searchText: action.payload };
    }
    case 'PARTICIPANT_CURRENT_PAGE_CHANGED': {
      return { ...state, currentPage: action.payload };
    }
    case 'PARTICIPANT_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'PARTICIPANT_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default participantSearch;
