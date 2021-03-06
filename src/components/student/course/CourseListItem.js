import React from 'react';
import PropTypes from 'prop-types';
import Tag from 'antd/lib/tag';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Badge from 'antd/lib/badge';
import './CourseListItem.css';

const CourseListItem = ({ course, showDetails }) => {

  let status = '';
  let text = '';

  switch (course.status) {
    case 0:
      status = 'default';
      text = 'Scheduled';
      break;
    case 1:
      status = 'processing';
      text = 'On Going';
      break;
    case 2:
      status = 'success';
      text = 'Completed';
      break;
    case 3:
      status = 'error';
      text = 'Problem';
      break;
    case 4:
      status = 'error';
      text = 'Pending';
      break;
    default:
      break;
  }
  return (
    <li className="CourseListItem" key={course.id}>
      <Row>
        <Col span={4}>
          <Tag className="CourseListItem-tag" color={course.Department.color} onClick={() => showDetails(course)}>
            {course.Department.code}
          </Tag>
        </Col>
        <Col span={13}>
          <div className="CourseListItem-title">{course.title}</div>
        </Col>
        {/* <Col span={2}>
          <Badge
            className="CourseListItem-badge"
            overflowCount={100}
            showZero
            count={course.completion}
            style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }}
          />
        </Col>*/ }
        <Col span={7}>
          <Badge className="CourseListItem-status" status={status} text={text} />
        </Col>
      </Row>
    </li>
  );
};

CourseListItem.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  showDetails: PropTypes.func.isRequired,
};

export default CourseListItem;
