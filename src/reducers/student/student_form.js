const defaultState = {
  id: {},
  oldSid: {},
  newSid: {},
  name: {},
  gender: {},
  level: {},
  email: {},
  birthDate: {},
  address: {},
  phone: {},
  mobilePhone: {},
  enrollYear: {},
  graduateYear: {},
  certificateNumber: {},
  ipk: {},
  krs: {},
  krsFileId: {},
  spp: {},
};

const studentForm = (state = defaultState, action) => {
  switch (action.type) {
    case 'SHOW_STUDENT_FORM_VALIDATION_ERRORS':
    case 'UPDATE_STUDENT_FORM': {
      const newState = { ...state, ...action.payload };
      return newState;
    }
    case 'LOAD_STUDENT': {
      return action.payload;
    }
    case 'CLEAR_STUDENT_FORM':
      return { ...defaultState };
    default:
      return state;
  }
};

export default studentForm;
