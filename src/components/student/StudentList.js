import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Button from 'antd/lib/button';
import './StudentList.css';

class StudentList extends Component {

  componentWillMount() {
    this.props.fetchStudents();
  }

  render() {
    if (this.props.students.length > 0) {
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
    return (
      <div style={{ widht: '100%', padding: 10, backgroundColor: '#f7f7f7' }}>
        <div style={{ fontWeight: 'bold', marginLeft: 'auto', marginRight: 'auto', width: 110, color: 'gray' }}>
          No student found
        </div>
      </div>
    );
  }
}

StudentList.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  fetchStudents: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default StudentList;
