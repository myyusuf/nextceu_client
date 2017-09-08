const defaultState = {
  rowKeys: [],
  selectedRows: [],
};

const preTestSelection = (state = defaultState, action) => {
  switch (action.type) {
    case 'PRE_TEST_SELECT_CHANGED': {
      return {
        ...state,
        rowKeys: action.payload.rowKeys,
        selectedRows: action.payload.selectedRows,
      };
    }
    case 'CLEAR_PRE_TEST_SELECT': {
      return {
        rowKeys: [],
        selectedRows: [],
      };
    }
    default:
      return state;
  }
};

export default preTestSelection;
