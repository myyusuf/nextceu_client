const defaultState = {
  visible: false,
};

const courseChartWindow = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_COURSE_CHART_WINDOW': {
      return { ...state, visible: true };
    }
    case 'HIDE_COURSE_CHART_WINDOW': {
      return { ...state, visible: false };
    }
    default:
      return state;
  }
};

export default courseChartWindow;
