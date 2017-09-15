import * as actions from '../../actions/ActionType';

const defaultState = {
  selectedMenuKey: '1-1',
};

const trees = (state = defaultState, action) => {
  switch (action.type) {
    case actions.bakordik.treeSelect:
      return { ...state, selectedMenuKey: action.payload };
    default:
      return state;
  }
};

export default trees;
