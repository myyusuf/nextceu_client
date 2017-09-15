import * as actions from '../../actions/ActionType';

const defaultState = {
  rowKeys: [],
  selectedRows: [],
};

const initiateStudentSelection = (state = defaultState, action) => {
  switch (action.type) {
    case actions.bakordik.initiateStudent.list.selection.selectChanged: {
      return {
        ...state,
        rowKeys: action.payload.rowKeys,
        selectedRows: action.payload.selectedRows,
      };
    }
    case actions.bakordik.initiateStudent.list.selection.clear: {
      return {
        rowKeys: [],
        selectedRows: [],
      };
    }
    default:
      return state;
  }
};

export default initiateStudentSelection;
