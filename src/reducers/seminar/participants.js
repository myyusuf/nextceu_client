const defaultState = [];

const participants = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_PARTICIPANTS_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default participants;
