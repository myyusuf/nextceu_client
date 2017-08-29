const defaultState = [];

const hospitals = (state = defaultState, action) => {
  switch (action.type) {
    case 'SELECT_HOSPITAL': {
      const newRows = state.map((hospital) => {
        if (hospital.id === action.payload.id) {
          return { ...hospital, selected: true };
        }
        return { ...hospital, selected: false };
      });
      return newRows;
    }
    case 'FETCH_HOSPITALS_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default hospitals;
