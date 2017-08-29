const defaultState = {
  id: {},
  code: {},
  name: {},
  hospitalType: {},
};

const hospitalModalForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_HOSPITAL_MODAL_FORM_VALIDATION_ERRORS':
    case 'UPDATE_HOSPITAL_MODAL_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'CLEAR_HOSPITAL_MODAL_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default hospitalModalForm;
