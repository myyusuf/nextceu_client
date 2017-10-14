const defaultState = {
  title: 'Student',
  subTitle: '',
};

const pageTitle = (state = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_WORKSPACE_PAGE_TITLE': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    default:
      return state;
  }
};

export default pageTitle;
