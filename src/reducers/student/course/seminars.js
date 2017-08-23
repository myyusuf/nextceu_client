const defaultState = [];

const seminars = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_SEMINARS_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default seminars;
