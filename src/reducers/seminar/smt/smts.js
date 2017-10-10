const defaultState = [];

const smts = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_SMTS_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default smts;
