const defaultState = [];

const students = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_STUDENT':
      const newState = [
        ...state,
        {
          id: 2,
          name: 'Student 2',
          newSid: '333',
          oldSid: '444',
        },
      ];

      return newState;
    default:
      return state;
  }
}