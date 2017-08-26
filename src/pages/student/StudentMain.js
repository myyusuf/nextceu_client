import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Menu from 'antd/lib/menu';

import StudentListPage from './StudentListPage';
import StudentDetailWrapper from '../../containers/student/StudentDetailWrapper';
import CoursePageWrapper from '../../containers/student/CoursePageWrapper';
import StudentWindow from '../../components/student/StudentWindow';

const StudentMain = ({ level, levelChanged }) => (
  <div>
    <Row>
      <Col span={24}>
        <Menu
          mode="horizontal"
          selectedKeys={[level]}
          onClick={event => levelChanged(event.key)}
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
        <StudentListPage />
      </Col>
      <Col span={10}>
        <StudentDetailWrapper />
      </Col>
      <Col span={7}>
        <CoursePageWrapper />
      </Col>
    </Row>
    <StudentWindow />
  </div>
);

StudentMain.propTypes = {
  level: PropTypes.string.isRequired,
  levelChanged: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    students: state.studentReducers.students,
    level: state.studentReducers.studentSearch.level,
  }
);

const mapDispatchToProps = dispatch => (
  {
    levelChanged: level => (
      dispatch({
        type: 'STUDENT_LEVEL_CHANGED_LOGIC',
        payload: level,
      })
    ),
  }
);

const StudentMainWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentMain);

export default StudentMainWrapper;
