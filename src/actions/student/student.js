export const fetchStudent = id => (
  {
    type: 'FETCH_STUDENT',
    id,
  }
);

export const cancelFetchStudent = () => (
  {
    type: 'CANCEL_FETCH_STUDENT',
  }
);
