import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'antd/lib/button';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import CourseList from '../../../components/student/course/CourseList';
import CourseWindow from '../../../components/student/course/CourseWindow';

import CourseChartWindow from '../../../components/student/course/CourseChartWindow';
import AddCourseByLevelWindow from '../../../components/student/course/AddCourseByLevelWindow';
import AddCourseByDepartmentWindow from '../../../components/student/course/AddCourseByDepartmentWindow';

import './CoursePage.css';

const CoursePage = ({
  student,
  openCourseChartWindow,
  openAddCourseByLevelWindow,
  openAddCourseByDepartmentWindow,
}) => {
  const menu = (
    <Menu
      onClick={({ key }) => {
        if (key === '1') {
          openAddCourseByLevelWindow();
        } else if (key === '2') {
          openAddCourseByDepartmentWindow();
        }
      }}
    >
      <Menu.Item key="1">By Level</Menu.Item>
      <Menu.Item key="2">By Department</Menu.Item>
    </Menu>
  );

  const chartMenu = (
    <Menu
      onClick={({ key }) => {
        openCourseChartWindow(key);
      }}
    >
      <Menu.Item key="1">Level 1</Menu.Item>
      <Menu.Item key="2">Level 2</Menu.Item>
    </Menu>
  );

  if (student.id) {
    return (
      <div className="CoursePage-container">
        <div style={{ marginTop: 5 }}>
          <span style={{ fontSize: 11, fontWeight: 'bold', color: 'gray' }}>ACTION</span>
        </div>
        <div style={{ marginTop: 10 }}>
          <Dropdown overlay={chartMenu}>
            <Button type="default">
              Chart
              <Icon type="layout" style={{ fontSize: 14 }} />
            </Button>
          </Dropdown>
          <Dropdown overlay={menu}>
            <Button type="primary" style={{ marginLeft: 10 }}>
              Add <Icon type="down" />
            </Button>
          </Dropdown>
        </div>
        <div style={{ marginTop: 20 }}>
          <span style={{ fontSize: 11, fontWeight: 'bold', color: 'gray' }}>TAKEN DEPARTMENTS</span>
        </div>
        <div style={{ marginTop: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 'bold', color: 'silver' }}>LEVEL 1</span>
        </div>
        <div style={{ marginTop: 10 }}>
          <CourseList level={1} />
        </div>

        <div style={{ marginTop: 20 }}>
          <span style={{ fontSize: 11, fontWeight: 'bold', color: 'silver' }}>LEVEL 2</span>
        </div>
        <div style={{ marginTop: 10 }}>
          <CourseList level={2} />
        </div>

        <CourseWindow />
        <AddCourseByLevelWindow />
        <AddCourseByDepartmentWindow />
        <CourseChartWindow />
      </div>
    );
  }

  return (
    <div className="CoursePage-container" style={{ backgroundColor: '#f9f9f9' }}>
      <img
        src="https://s3-ap-southeast-1.amazonaws.com/admin.ceufkumi.id/static/images/empty_pages/Empty_student_detail2.png"
        style={{ width: 318, marginTop: 25 }}
      />
    </div>
  );
};

CoursePage.propTypes = {
  student: PropTypes.shape.isRequired,
  openAddCourseByLevelWindow: PropTypes.func.isRequired,
  openAddCourseByDepartmentWindow: PropTypes.func.isRequired,
  openCourseChartWindow: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    student: state.studentReducers.student,
  }
);

const mapDispatchToProps = dispatch => (
  {
    openAddCourseByLevelWindow: () => (
      dispatch({
        type: 'EDIT_ADD_COURSE_BY_LEVEL_LOGIC',
      })
    ),
    openAddCourseByDepartmentWindow: () => (
      dispatch({
        type: 'EDIT_ADD_COURSE_BY_DEPARTMENT_LOGIC',
      })
    ),
    openCourseChartWindow: chartLevel => (
      dispatch({
        type: 'SHOW_COURSE_CHART_WINDOW',
        payload: chartLevel,
      })
    ),
  }
);

const CoursePageWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CoursePage);

export default CoursePageWrapper;
