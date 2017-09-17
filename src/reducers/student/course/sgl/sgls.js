const defaultState = [];

const gls = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_SGLS_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default gls;
