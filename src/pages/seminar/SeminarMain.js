import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Select from 'antd/lib/select';
import DatePicker from 'antd/lib/date-picker';
import Button from 'antd/lib/button';

import './SeminarMain.css';
import { filterStudentsByLevelText } from '../../actions/student/students';
import SeminarList from '../../components/seminar/SeminarList';
import SeminarDetailsPage from './SeminarDetailsPage';

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const SeminarMain = ({ openAddWindow }) => (
  <div>
    <Row>
      <Col span={10}>
        <SeminarList />
      </Col>
      <Col span={14} style={{ backgroundColor: '#fff' }}>
        <SeminarDetailsPage />
      </Col>
    </Row>
  </div>
);

SeminarMain.propTypes = {
  openAddWindow: PropTypes.func.isRequired,
};

// const mapStateToProps = state => (
//   {
//   }
// );

const mapDispatchToProps = dispatch => (
  {
    filterStudents: level => (
      dispatch(filterStudentsByLevelText(level))
    ),
    openAddWindow: () => (
      dispatch({
        type: 'ADD_HOSPITAL_LOGIC',
      })
    ),
  }
);

const SeminarMainWrapper = connect(
  null,
  mapDispatchToProps,
)(SeminarMain);

export default SeminarMainWrapper;
