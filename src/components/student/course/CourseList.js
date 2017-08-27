import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CourseListItem from './CourseListItem';

const CourseList = ({ courses, level, showDetails }) => {
  let componentToRender = <div style={{ marginLeft: 10, color: 'gray', fontWeight: 'bold', fontSize: 11 }}>No Item</div>;
  if (courses.length > 0) {
    componentToRender = (
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
  }
  return componentToRender;
};

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

const mapStateToProps = state => (
  {
    courses: state.studentReducers.courses,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchCourses: () => {
      dispatch({
        type: 'FETCH_COURSES_LOGIC',
      });
    },
    showDetails: course => (
      dispatch({
        type: 'LOAD_COURSE_TO_FORM_LOGIC',
        payload: course,
      })
    ),
  }
);

const CourseListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseList);

export default CourseListWrapper;
