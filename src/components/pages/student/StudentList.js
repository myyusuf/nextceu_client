import React from 'react';
import PropTypes from 'prop-types';
// import Button from 'antd/lib/button';
import './StudentList.css';

const StudentList = ({ students, onItemClick }) => (
  <ul className="StudentList-container">
    { students.map(student => (
      <li
        key={student.id}
        className={student.selected ? 'StudentList-item-selected' : ''}
        onClick={() => onItemClick()}
      >
        <span className="StudentList-item-text">{student.name}</span>
        <span className="StudentList-item-sub-text">{student.newSid}</span>
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
