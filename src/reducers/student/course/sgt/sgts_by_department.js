const defaultState = [];

const sgtsByDepartment = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_SGTS_BY_DEPARTMENT_SUCCESS':
      return action.payload;
    case 'CLEAR_SGTS_BY_DEPARTMENT':
      return [];
    default:
      return state;
  }
};

export default sgtsByDepartment;
