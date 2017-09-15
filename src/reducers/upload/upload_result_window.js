import * as actions from '../../actions/ActionType';

const defaultState = {
  visible: false,
  uploadResult: [],
};

const uploads = (state = defaultState, action) => {
  switch (action.type) {
    case actions.upload.uploadResult.window.open:
      return { ...state, visible: true, uploadResult: [...state.uploadResult] };
    case actions.upload.uploadResult.window.close:
      return { ...state, visible: false, uploadResult: [...state.uploadResult] };
    case actions.upload.uploadResult.loadResult:
      return { ...state, uploadResult: action.payload };
    case actions.upload.uploadResult.clearResult:
      return { ...state, uploadResult: [] };
    default:
      return state;
  }
};

export default uploads;
