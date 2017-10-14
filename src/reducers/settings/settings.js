const defaultState = {
  selectedMenuKey: '1-1',
  selectedMenuTitle: '',
};

const settings = (state = defaultState, action) => {
  switch (action.type) {
    case 'SELECT_MENU_KEY':
      return {
        ...state,
        selectedMenuKey: action.payload.key,
        selectedMenuTitle: action.payload.title,
      };
    default:
      return state;
  }
};

export default settings;
