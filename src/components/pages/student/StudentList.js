import React from 'react';
import PropTypes from 'prop-types';

const StudentList = ({ students }) => (
  <ul>
    { students.map(student => (
      <li key={student.id}>
        {student.name}
      </li>
    ))}
  </ul>
);

StudentList.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default StudentList;
