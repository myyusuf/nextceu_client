import React from 'react';
import PropTypes from 'prop-types';
import HospitalStudentListItem from './HospitalStudentListItem';

const HospitalStudent = ({ students }) => (
  <div>
    {students.map(student => (
      <HospitalStudentListItem student={student} />
    ))}
  </div>
);

HospitalStudent.propTypes = {
  students: PropTypes.arrayOf(PropTypes.shape({
    oldSid: PropTypes.string.isRequired,
    newSid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default HospitalStudent;
