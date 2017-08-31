const defaultState = {
  rowKeys: [],
  selectedRows: [],
};

const seminarSelection = (state = defaultState, action) => {
  switch (action.type) {
    case 'SEMINAR_SELECT_CHANGED': {
      return {
        ...state,
        rowKeys: action.payload.rowKeys,
        selectedRows: action.payload.selectedRows,
      };
    }
    case 'CLEAR_SEMINAR_SELECT': {
      return {
        rowKeys: [],
        selectedRows: [],
      };
    }
    default:
      return state;
  }
};

export default seminarSelection;
