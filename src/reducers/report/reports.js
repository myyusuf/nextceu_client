const defaultState = {
  selectedMenuKey: '1-1',
};

const reports = (state = defaultState, action) => {
  switch (action.type) {
    case 'SELECT_REPORT_MENU_KEY':
      return { ...state, selectedMenuKey: action.payload };
    default:
      return state;
  }
};

export default reports;
