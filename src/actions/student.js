export const loadStudent = student => (
  {
    type: 'LOAD_STUDENT',
    student,
  }
);

export const getStudent = id => (
  {
    type: 'FETCH_STUDENT',
    id,
  }
);
