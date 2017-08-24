import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Menu from 'antd/lib/menu';

import './HospitalMain.css';
import { filterStudentsByLevelText } from '../../actions/student/students';
import HospitalList from './HospitalList';
import CoursePageWrapper from '../../containers/student/CoursePageWrapper';
import AddStudentWindowWrapper from '../../containers/student/AddStudentWindowWrapper';

class HospitalMain extends Component {

  render() {
    return (
      <div>
        <Row>
          <Col span={17}>
            <HospitalList />
          </Col>
          <Col span={7} style={{ backgroundColor: '#eDeff5' }}>
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

const HospitalMainWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HospitalMain);

export default HospitalMainWrapper;
