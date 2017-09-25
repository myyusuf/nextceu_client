const defaultState = [];

const allDepartments = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_ALL_DEPARTMENTS_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default allDepartments;
