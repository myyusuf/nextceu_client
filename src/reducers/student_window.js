const defaultState = {
  visible: false,
};

const studentWindow = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_STUDENT_WINDOW': {
      return { visible: true };
    }
    case 'HIDE_STUDENT_WINDOW': {
      return { visible: false };
    }
    default:
      return state;
  }
};

export default studentWindow;
