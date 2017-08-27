import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spin from 'antd/lib/spin';
import './StudentList.css';

class StudentList extends Component {

  componentWillMount() {
    this.props.fetchStudents();
  }

  render() {
    if (this.props.students.length > 0) {
      return (
        <div>
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
          <div style={{ width: 20, marginLeft: 'auto', marginRight: 'auto' }}>
            <Spin spinning={this.props.loading} />
          </div>
        </div>
      );
    }
    return (
      <div style={{ widht: '100%', padding: 10, backgroundColor: '#f7f7f7' }}>
        <div style={{ fontWeight: 'bold', marginLeft: 'auto', marginRight: 'auto', width: 110, color: 'gray' }}>
          No student found
        </div>
        <div style={{ width: 20, marginLeft: 'auto', marginRight: 'auto' }}>
          <Spin spinning={this.props.loading} />
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
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    students: state.studentReducers.students.rows,
    loading: state.studentReducers.studentSearch.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onItemClick: (student) => {
      dispatch({
        type: 'SELECT_STUDENT_LOGIC',
        payload: student,
      });
    },
    fetchStudents: () => {
      dispatch({
        type: 'FETCH_STUDENTS_LOGIC',
      });
    },
  }
);

const StudentListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentList);

export default StudentListWrapper;
