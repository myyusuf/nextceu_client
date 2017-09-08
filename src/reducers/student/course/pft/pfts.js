const defaultState = [];

const pfts = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_PFTS_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default pfts;
