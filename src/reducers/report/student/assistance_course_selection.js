import * as actions from '../../../actions/ActionType';

const defaultState = {
  rowKeys: [],
  selectedRows: [],
};

const assistanceCourseSelection = (state = defaultState, action) => {
  switch (action.type) {
    case actions.report.student.assistanceCourse.list.selection.selectChanged: {
      return {
        ...state,
        rowKeys: action.payload.rowKeys,
        selectedRows: action.payload.selectedRows,
      };
    }
    case actions.report.student.assistanceCourse.list.selection.clear: {
      return {
        rowKeys: [],
        selectedRows: [],
      };
    }
    default:
      return state;
  }
};

export default assistanceCourseSelection;
