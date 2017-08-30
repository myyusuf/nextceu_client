const defaultState = {
  visible: false,
  resultContainer: '',
};

const hospitalScheduleWindow = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_HOSPITAL_SCHEDULE_WINDOW': {
      return { ...state, visible: true, resultContainer: action.payload };
    }
    case 'HIDE_HOSPITAL_SCHEDULE_WINDOW': {
      return { ...state, visible: false, resultContainer: '' };
    }
    default:
      return state;
  }
};

export default hospitalScheduleWindow;
