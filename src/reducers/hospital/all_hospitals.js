const defaultState = [];

const allHospitals = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_ALL_HOSPITALS_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default allHospitals;
