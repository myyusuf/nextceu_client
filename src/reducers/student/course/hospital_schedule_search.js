const defaultState = {
  department: null,
  dateRange: [new Date(), new Date()],
  loading: false,
};

const hospitalScheduleSearch = (state = defaultState, action) => {
  switch (action.type) {
    case 'HOSPITAL_SCHEDULE_DEPARTMENT_CHANGED': {
      return { ...state, department: action.payload };
    }
    case 'HOSPITAL_SCHEDULE_DATE_RANGE_CHANGED': {
      return { ...state, dateRange: action.payload };
    }
    case 'HOSPITAL_SCHEDULE_LOADING_START': {
      return { ...state, loading: true };
    }
    case 'HOSPITAL_SCHEDULE_LOADING_FINISH': {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default hospitalScheduleSearch;
