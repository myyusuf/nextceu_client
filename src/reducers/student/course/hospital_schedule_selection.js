const defaultState = {
  rowKeys: [],
  selectedRows: [],
};

const hospitalSelectionSelection = (state = defaultState, action) => {
  switch (action.type) {
    case 'HOSPITAL_SCHEDULE_SELECT_CHANGED': {
      return {
        ...state,
        rowKeys: action.payload.rowKeys,
        selectedRows: action.payload.selectedRows,
      };
    }
    default:
      return state;
  }
};

export default hospitalSelectionSelection;
