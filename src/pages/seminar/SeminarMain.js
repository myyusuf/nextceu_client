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
import HospitalList from '../../components/hospital/HospitalList';
import SeminarDetailsPage from './SeminarDetailsPage';

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const SeminarMain = ({ openAddWindow }) => (
  <div>
    <Row gutter={10}>
      <Col span={4} offset={7}>
        <RangePicker
          onChange={(date) => {
            this.handleInputChange('planDate', date);
          }}
        />
      </Col>
      <Col span={4}>
        <Select defaultValue="lucy" style={{ width: 200, marginBottom: 20 }}>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="disabled" disabled>Disabled</Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
      </Col>
      <Col span={2}>
        <Button
          type="primary"
          shape="circle"
          icon="plus"
          onClick={() => openAddWindow()}
        />
      </Col>
    </Row>

    <Row>
      <Col span={10}>
        <HospitalList />
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
