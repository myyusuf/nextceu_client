const defaultState = {
  visible: false,
  level: 1,
  weekly: true,
};

const courseChartWindow = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_COURSE_CHART_WINDOW': {
      return { ...state, visible: true, level: action.payload };
    }
    case 'HIDE_COURSE_CHART_WINDOW': {
      return { ...state, visible: false };
    }
    case 'CHANGE_WEEKLY_CHART_WINDOW': {
      return { ...state, weekly: action.payload };
    }
    default:
      return state;
  }
};

export default courseChartWindow;
