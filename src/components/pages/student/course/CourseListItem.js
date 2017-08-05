import React from 'react';
import PropTypes from 'prop-types';
import Tag from 'antd/lib/tag';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Badge from 'antd/lib/badge';
import './CourseListItem.css';

const CourseListItem = ({ course }) => (
  <li className="CourseListItem" key={course.id}>
    <Row>
      <Col span={4}>
        <Tag className="CourseListItem-tag" color={course.Department.color}>
          {course.Department.code}
        </Tag>
      </Col>
      <Col span={12}>
        <div className="CourseListItem-title">{course.title}</div>
      </Col>
      <Col span={2}>
        <Badge className="CourseListItem-badge" count={25} style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }} />
      </Col>
      <Col span={6}>
        <Badge className="CourseListItem-status" status="processing" text="On Going" />
      </Col>
    </Row>

  </li>
);

CourseListItem.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default CourseListItem;
