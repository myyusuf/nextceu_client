const defaultState = [];

const hospitals = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_HOSPITALS_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default hospitals;
