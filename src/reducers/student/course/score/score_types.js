const defaultState = [];

const scoreTypes = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_SCORE_TYPES_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default scoreTypes;
