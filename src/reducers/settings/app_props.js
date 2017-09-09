const defaultState = [];

const appProps = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_APP_PROPS_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default appProps;
