import React from 'react';
import PropTypes from 'prop-types';
import CourseListItem from './CourseListItem';

const CourseList = ({ courses, level }) => (
  <ul>
    {
      courses
      .filter(
        course => course.Department.level === level,
      )
      .map(course =>
        (
          <CourseListItem course={course} key={course.id} />
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
};

export default CourseList;
