import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Menu from 'antd/lib/menu';

import './SeminarMain.css';
import { filterStudentsByLevelText } from '../../actions/student/students';
import StudentListPageWrapper from '../../containers/student/StudentListPageWrapper';
import StudentDetailWrapper from '../../containers/student/StudentDetailWrapper';
import CoursePageWrapper from '../../containers/student/CoursePageWrapper';
import AddStudentWindowWrapper from '../../containers/student/AddStudentWindowWrapper';

class SeminarMain extends Component {

  render() {
    return (
      <div>
        <Row>
          <Col span={7}>
            <StudentListPageWrapper />
          </Col>
          <Col span={10}>
            <StudentDetailWrapper />
          </Col>
          <Col span={7}>
            <CoursePageWrapper />
          </Col>
        </Row>
        <AddStudentWindowWrapper />
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    students: state.studentReducers.students,
    studentFilter: state.studentReducers.studentFilter,
  }
);

const mapDispatchToProps = dispatch => (
  {
    filterStudents: level => (
      dispatch(filterStudentsByLevelText(level))
    ),
  }
);

const SeminarMainWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeminarMain);

export default SeminarMainWrapper;
