const defaultState = [];

const hospitalDepartments = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_HOSPITAL_DEPARTMENTS_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default hospitalDepartments;
