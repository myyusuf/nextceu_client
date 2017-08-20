import React from 'react';
// import PropTypes from 'prop-types';
// import Tag from 'antd/lib/tag';
import Button from 'antd/lib/button';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
// import Progress from 'antd/lib/progress';
import CourseListContainer from '../../../containers/student/CourseListWrapper';
import CourseWindowWrapper from '../../../containers/student/course/CourseWindowWrapper';

import './CoursePage.css';

const CoursePage = ({ student }) => {
  const menu = (
    <Menu>
      <Menu.Item key="1">By Level</Menu.Item>
      <Menu.Item key="2">By Department</Menu.Item>
    </Menu>
  );

  if (student.id) {
    return (
      <div className="CoursePage-container">
        <div style={{ marginTop: 5 }}>
          <span style={{ fontSize: 11, fontWeight: 'bold', color: 'gray' }}>ACTION</span>
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="default">
            Chart
            <Icon type="layout" style={{ fontSize: 14 }} />
          </Button>
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
          <CourseListContainer level={1} />
        </div>

        <div style={{ marginTop: 20 }}>
          <span style={{ fontSize: 11, fontWeight: 'bold', color: 'silver' }}>LEVEL 2</span>
        </div>
        <div style={{ marginTop: 10 }}>
          <CourseListContainer level={2} />
        </div>

        <CourseWindowWrapper />
      </div>
    );
  }

  return (
    <div>
    </div>
  );
};

export default CoursePage;
