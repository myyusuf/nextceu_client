import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';
import Switch from 'antd/lib/switch';
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

const CourseChartWindow = ({ visible, onCancel, courses, level, weekly, changeWeekly }) => {
  const courseCharData = {
    data: parseChartData(courses.filter(course => course.Department.level === parseInt(level, 10))),
  };
  return (
    <Modal
      title="Taken Departments Chart"
      visible={visible}
      onCancel={onCancel}
      wrapClassName="vertical-center-modal"
      footer={[
        <span style={{ marginRight: 10 }}>Weekly</span>,
        <Switch
          checked={weekly}
          style={{ marginRight: 10 }}
          onChange={checked => changeWeekly(checked)}
        />,
        <Button size="large" onClick={onCancel}>Close</Button>,
      ]}
      width="95%"
    >
      <div style={{ height: '500' }}>
        <Gantt tasks={courseCharData} weekly={weekly} />
      </div>
    </Modal>
  );
};

CourseChartWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  courses: PropTypes.arrayOf(PropTypes.shape).isRequired,
  level: PropTypes.string.isRequired,
  weekly: PropTypes.bool.isRequired,
  changeWeekly: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.studentReducers.courseChartWindow.visible,
    level: state.studentReducers.courseChartWindow.level,
    weekly: state.studentReducers.courseChartWindow.weekly,
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
    changeWeekly: (value) => {
      dispatch({
        type: 'CHANGE_WEEKLY_CHART_WINDOW',
        payload: value,
      });
    },
  }
);

const CourseChartWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CourseChartWindow);

export default CourseChartWindowWrapper;
