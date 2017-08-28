const defaultState = {
  visible: false,
};

const hospitalScheduleWindow = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_HOSPITAL_SCHEDULE_WINDOW': {
      return { ...state, visible: true };
    }
    case 'HIDE_HOSPITAL_SCHEDULE_WINDOW': {
      return { ...state, visible: false };
    }
    default:
      return state;
  }
};

export default hospitalScheduleWindow;
