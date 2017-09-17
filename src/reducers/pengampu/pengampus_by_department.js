const defaultState = [];

const pengampusByDepartment = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_PENGAMPUS_BY_DEPARTMENT_SUCCESS':
      return action.payload;
    case 'CLEAR_PENGAMPUS_BY_DEPARTMENT':
      return [];
    default:
      return state;
  }
};

export default pengampusByDepartment;
