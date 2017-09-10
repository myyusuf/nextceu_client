const defaultState = [];

const docentsByHd = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_DOCENTS_BY_HD_SUCCESS':
      return action.payload;
    case 'CLEAR_DOCENTS_BY_HD':
      return [];
    default:
      return state;
  }
};

export default docentsByHd;
