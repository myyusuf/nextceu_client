const defaultState = [];

const cpts = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_CPTS_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default cpts;
