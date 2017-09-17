const defaultState = [];

const pftsByDepartment = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_PFTS_BY_DEPARTMENT_SUCCESS':
      return action.payload;
    case 'CLEAR_PFTS_BY_DEPARTMENT':
      return [];
    default:
      return state;
  }
};

export default pftsByDepartment;
