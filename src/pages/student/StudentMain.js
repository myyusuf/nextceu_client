import React, { Component } from 'react';
import { connect } from 'react-redux';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Menu from 'antd/lib/menu';

import './StudentMain.css';
import { filterStudentsByLevelText } from '../../actions/student/students';
import StudentListPageWrapper from '../../containers/student/StudentListPageWrapper';
import StudentDetailWrapper from '../../containers/student/StudentDetailWrapper';
import CoursePageWrapper from '../../containers/student/CoursePageWrapper';
import AddStudentWindowWrapper from '../../containers/student/AddStudentWindowWrapper';

class StudentMain extends Component {

  render() {
    return (
      <div>
        <Row>
          <Col span={24}>
            <Menu
              mode="horizontal"
              selectedKeys={[this.props.studentFilter.level]}
              onClick={event => this.props.filterStudents(event.key)}
            >
              <Menu.Item key="1">
                LEVEL 1
              </Menu.Item>
              <Menu.Item key="2">
                LEVEL 2
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
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

const StudentMainWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentMain);

export default StudentMainWrapper;
