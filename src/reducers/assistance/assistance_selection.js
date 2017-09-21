const defaultState = {
  rowKeys: [],
  selectedRows: [],
};

const assistanceSelection = (state = defaultState, action) => {
  switch (action.type) {
    case 'ASSISTANCE_SELECT_CHANGED': {
      return {
        ...state,
        rowKeys: action.payload.rowKeys,
        selectedRows: action.payload.selectedRows,
      };
    }
    case 'CLEAR_ASSISTANCE_SELECT': {
      return {
        rowKeys: [],
        selectedRows: [],
      };
    }
    default:
      return state;
  }
};

export default assistanceSelection;
