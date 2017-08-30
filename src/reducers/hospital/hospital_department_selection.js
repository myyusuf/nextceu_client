const defaultState = {
  rowKeys: [],
};

const hospitalDepartmentSelection = (state = defaultState, action) => {
  switch (action.type) {
    case 'HOSPITAL_SCHEDULE_SELECT_CHANGED': {
      return { ...state, rowKeys: action.payload };
    }
    default:
      return state;
  }
};

export default hospitalDepartmentSelection;
