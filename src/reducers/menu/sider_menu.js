const defaultState = {
  selectedMenu: 'student',
};

const siderMenu = (state = defaultState, action) => {
  switch (action.type) {
    case 'SELECT_SIDER_MENU': {
      return { ...state, selectedMenu: action.payload };
    }
    default:
      return state;
  }
};

export default siderMenu;
