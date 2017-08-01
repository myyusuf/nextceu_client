import React from 'react';
import PropTypes from 'prop-types';
import CourseListItem from './CourseListItem';

const CourseList = ({ courses }) => (
  <ul>
    {
      courses.map((course) => {
        return (
          <CourseListItem course={course} key={course.id} />
        );
      })
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
};

export default CourseList;
