import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Select from 'antd/lib/select';
import DatePicker from 'antd/lib/date-picker';
import Button from 'antd/lib/button';

import './HospitalMain.css';
import { filterStudentsByLevelText } from '../../actions/student/students';
import HospitalList from '../../components/hospital/HospitalList';
import HospitalDetailsPage from './HospitalDetailsPage';

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const HospitalMain = ({ openAddWindow }) => (
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
      <Col span={17}>
        <HospitalList />
      </Col>
      <Col span={7} style={{ backgroundColor: '#fff' }}>
        <HospitalDetailsPage />
      </Col>
    </Row>
  </div>
);

HospitalMain.propTypes = {
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

const HospitalMainWrapper = connect(
  null,
  mapDispatchToProps,
)(HospitalMain);

export default HospitalMainWrapper;
