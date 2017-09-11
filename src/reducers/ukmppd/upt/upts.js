const defaultState = [];

const upts = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_UPTS_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default upts;
