const defaultState = {
  rowKeys: [],
  selectedRows: [],
};

const initiateCourseSelection = (state = defaultState, action) => {
  switch (action.type) {
    case 'INITIATE_COURSE_SELECT_CHANGED': {
      return {
        ...state,
        rowKeys: action.payload.rowKeys,
        selectedRows: action.payload.selectedRows,
      };
    }
    case 'CLEAR_INITIATE_COURSE_SELECT': {
      return {
        rowKeys: [],
        selectedRows: [],
      };
    }
    default:
      return state;
  }
};

export default initiateCourseSelection;
