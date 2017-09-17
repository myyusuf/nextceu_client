const defaultState = [];

const sgts = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_SGTS_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default sgts;
