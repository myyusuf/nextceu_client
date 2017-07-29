import React from 'react';
import PropTypes from 'prop-types';

const StudentDetail = ({ student }) => (
  <div>
    <span className="StudentDetail-name">{ student.name }</span>
  </div>
);

StudentDetail.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default StudentDetail;