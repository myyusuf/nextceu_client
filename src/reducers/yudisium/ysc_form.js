import * as actions from '../../actions/ActionType';

const defaultState = {
  id: {},
  checklist1: {},
  checklist2: {},
  checklist3: {},
};

const yscForm = (state = defaultState, action) => {
  switch (action.type) {
    case actions.yudisium.yscForm.showErrors:
    case actions.yudisium.yscForm.update: {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case actions.yudisium.yscForm.setForm: {
      return action.payload;
    }
    case actions.yudisium.yscForm.clear:
      return { ...defaultState };
    default:
      return state;
  }
};

export default yscForm;
