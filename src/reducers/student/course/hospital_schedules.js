const defaultState = [];

const hospitalSchedules = (state = defaultState, action) => {
  switch (action.type) {
    case 'FETCH_HOSPITAL_SCHEDULES_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};

export default hospitalSchedules;
