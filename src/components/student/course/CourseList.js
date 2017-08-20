import React from 'react';
import PropTypes from 'prop-types';
import CourseListItem from './CourseListItem';

const CourseList = ({ courses, level, showDetails }) => (
  <ul>
    {
      courses
      .filter(
        course => course.Department.level === level,
      )
      .map(course =>
        (
          <CourseListItem course={course} key={course.id} showDetails={showDetails} />
        ),
      )
    }
  </ul>
);

CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  level: PropTypes.number.isRequired,
  showDetails: PropTypes.func.isRequired,
};

export default CourseList;
