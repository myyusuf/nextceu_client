const defaultState = {
  selectedMenuKey: '',
};

const settings = (state = defaultState, action) => {
  switch (action.type) {
    case 'SELECT_MENU_KEY':
      return { ...state, selectedMenuKey: action.payload };
    default:
      return state;
  }
};

export default settings;