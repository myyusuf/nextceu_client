const defaultState = {
  visible: false,
  level: 1,
};

const courseChartWindow = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_COURSE_CHART_WINDOW': {
      return { ...state, visible: true, level: action.payload };
    }
    case 'HIDE_COURSE_CHART_WINDOW': {
      return { ...state, visible: false };
    }
    default:
      return state;
  }
};

export default courseChartWindow;
