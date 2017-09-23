const defaultState = [];

const supervisorsForSelect = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_SUPERVISORS_FOR_SELECT_SUCCESS':
      return action.payload;
    case 'CLEAR_SUPERVISORS_FOR_SELECT':
      return [];
    default:
      return state;
  }
};

export default supervisorsForSelect;
