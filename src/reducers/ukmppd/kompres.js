const defaultState = [];

const kompres = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_KOMPRES_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default kompres;
