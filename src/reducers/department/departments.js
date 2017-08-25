const defaultState = [];

const departments = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_DEPARTMENTS_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default departments;
