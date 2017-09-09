const defaultState = {
  rows: [],
  count: 0,
};

const hospitalUsers = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_HOSPITAL_USERS_SUCCESS':
      return { ...state, rows: action.payload.rows, count: action.payload.count };
    default:
      return state;
  }
};

export default hospitalUsers;
