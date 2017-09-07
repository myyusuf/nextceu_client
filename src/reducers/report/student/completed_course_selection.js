const defaultState = {
  rowKeys: [],
  selectedRows: [],
};

const completedCourseSelection = (state = defaultState, action) => {
  switch (action.type) {
    case 'COMPLETED_COURSE_SELECT_CHANGED': {
      return {
        ...state,
        rowKeys: action.payload.rowKeys,
        selectedRows: action.payload.selectedRows,
      };
    }
    case 'CLEAR_COMPLETED_COURSE_SELECT': {
      return {
        rowKeys: [],
        selectedRows: [],
      };
    }
    default:
      return state;
  }
};

export default completedCourseSelection;
