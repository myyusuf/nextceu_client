import * as actions from '../../../actions/ActionType';

const defaultState = {
  rows: [],
  count: 0,
};

const initiateCourses = (state = defaultState, action) => {
  switch (action.type) {
    case actions.report.student.initiateCourse.fetchCoursesSuccess:
      return { ...state, rows: action.payload.rows, count: action.payload.count };
    default:
      return state;
  }
};

export default initiateCourses;
