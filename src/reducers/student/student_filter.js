const defaultState = {
  level: '1',
  searchText: '',
};

const studentFilter = (state = defaultState, action) => {
  switch (action.type) {
    case 'FILTER_STUDENTS_BY_LEVEL':
      {
        const newState = { ...state };
        newState.level = action.payload;
        return newState;
      }
    case 'FILTER_STUDENTS_BY_SEARCH_TEXT':
      {
        const newState = { ...state };
        newState.searchText = action.payload;
        return newState;
      }
    default:
      return state;
  }
};

export default studentFilter;
