const defaultState = [];

const scores = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_SCORES_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default scores;
