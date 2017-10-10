const defaultState = [];

const smtsByDepartment = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_SMTS_BY_DEPARTMENT_SUCCESS':
      return action.payload;
    case 'CLEAR_SMTS_BY_DEPARTMENT':
      return [];
    default:
      return state;
  }
};

export default smtsByDepartment;
