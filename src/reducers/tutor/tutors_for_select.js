const defaultState = [];

const tutorsForSelect = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_TUTORS_FOR_SELECT_SUCCESS':
      return action.payload;
    case 'CLEAR_TUTORS_FOR_SELECT':
      return [];
    default:
      return state;
  }
};

export default tutorsForSelect;
