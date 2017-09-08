const defaultState = [];

const portofolios = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_PORTOFOLIOS_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default portofolios;
