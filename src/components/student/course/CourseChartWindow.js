import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';
import moment from 'moment';
import Gantt from '../../chart/Gantt';

const parseChartData = (courses) => {
  const result = [];
  let childId = 100000000;
  for (let i = 0; i < courses.length; i += 1) {
    const course = courses[i];
    const mainSchedule = {
      id: course.id,
      text: course.title,
      color: course.Department.color,
      start_date: moment(course.planStartDate).format('DD-MM-YYYY'),
      end_date: moment(course.planEndDate).format('DD-MM-YYYY'),
    };

    const hospitalSchedule1 = {
      id: course.id + childId,
      parent: course.id,
      text: 'RS 1',
      color: '#D6DBDF',
      start_date: moment(course.planStartDate1).format('DD-MM-YYYY'),
      end_date: moment(course.planEndDate1).format('DD-MM-YYYY'),
    };

    childId += 1;

    const clinic = {
      id: course.id + childId,
      parent: course.id,
      text: 'Puskesmas',
      color: '#D6DBDF',
      start_date: moment(course.planStartDate2).format('DD-MM-YYYY'),
      end_date: moment(course.planEndDate2).format('DD-MM-YYYY'),
    };

    childId += 1;

    const hospitalSchedule2 = {
      id: course.id + childId,
      parent: course.id,
      text: 'RS 2',
      color: '#D6DBDF',
      start_date: moment(course.planStartDate3).format('DD-MM-YYYY'),
      end_date: moment(course.planEndDate3).format('DD-MM-YYYY'),
    };

    result.push(mainSchedule);
    result.push(hospitalSchedule1);
    result.push(clinic);
    result.push(hospitalSchedule2);

    childId += 300;
  }

  console.log('>>>>>>>', result);

  return result;
};

const CourseChartWindow = ({ visible, onCancel, courses }) => {
  const courseCharData = { data: parseChartData(courses) };
  return (
    <Modal
      title="Add Student"
      visible={visible}
      onCancel={onCancel}
      wrapClassName="vertical-center-modal"
      footer={[
        <Button size="large" onClick={onCancel}>Close</Button>,
      ]}
      width="90%"
    >
      <div style={{ height: '500' }}>
        <Gantt tasks={courseCharData} />
      </div>
    </Modal>
  );
};

CourseChartWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  courses: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.studentReducers.courseChartWindow.visible,
    courses: state.studentReducers.courses,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'HIDE_COURSE_CHART_WINDOW',
      });
    },
  }
);

const CourseChartWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseChartWindow);

export default CourseChartWindowWrapper;
