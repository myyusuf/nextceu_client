const defaultState = [];

const docentsByCD = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_DOCENTS_BY_CD_SUCCESS':
      return action.payload;
    case 'CLEAR_DOCENTS_BY_CD':
      return [];
    default:
      return state;
  }
};

export default docentsByCD;
