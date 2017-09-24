import * as actions from '../../../actions/ActionType';

const defaultState = {
  rows: [],
  count: 0,
};

const assistanceCourses = (state = defaultState, action) => {
  switch (action.type) {
    case actions.report.student.assistanceCourse.fetchCoursesSuccess:
      return { ...state, rows: action.payload.rows, count: action.payload.count };
    default:
      return state;
  }
};

export default assistanceCourses;
