import * as actions from '../../actions/ActionType';

const defaultState = {
  loading: false,
  portofolioCompletions: [],
};

const portofolioCompletions = (state = defaultState, action) => {
  switch (action.type) {
    case actions.yudisium.portofolioCompletion.fetchPortofolioCompletionsSuccess:
      return { ...state, portofolioCompletions: action.payload };
    case actions.yudisium.portofolioCompletion.loadingStart:
      return { ...state, loading: true, portofolioCompletions: [...state.portofolioCompletions] };
    case actions.yudisium.portofolioCompletion.loadingFinish:
      return { ...state, loading: false, portofolioCompletions: [...state.portofolioCompletions] };
    default:
      return state;
  }
};

export default portofolioCompletions;
