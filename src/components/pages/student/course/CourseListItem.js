import React from 'react';
import PropTypes from 'prop-types';

const CourseListItem = ({ course }) => (
  <li className="CourseListItem-item" key={course.id}>
    {course.title}
  </li>
);

CourseListItem.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default CourseListItem;
