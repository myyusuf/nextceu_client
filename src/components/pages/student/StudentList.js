import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Button from 'antd/lib/button';
import './StudentList.css';

class StudentList extends Component {

  componentDidMount() {
    this.props.getStudents();
  }

  render() {
    return (
      <ul className="StudentList-container">
        { this.props.students.map(student => (
          <li
            key={student.id}
            className={student.selected ? 'StudentList-item-selected' : ''}
            onClick={() => this.props.onItemClick(student)}
          >
            <span className="StudentList-item-text">{student.name}</span>
            <span className="StudentList-item-sub-text">{student.oldSid} {student.newSid}</span>
          </li>
        ))}
      </ul>
    );
  }
};

StudentList.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default StudentList;
