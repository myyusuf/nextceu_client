const defaultState = [];

const docentsByHd = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_DOCENTS_BY_HD_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default docentsByHd;
