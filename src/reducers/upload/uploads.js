const defaultState = [];

const uploads = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_UPLOADS_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default uploads;
