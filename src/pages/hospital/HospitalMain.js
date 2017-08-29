import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Select from 'antd/lib/select';
import DatePicker from 'antd/lib/date-picker';
import Button from 'antd/lib/button';

import './HospitalMain.css';
import HospitalList from '../../components/hospital/HospitalList';
import HospitalDetailsPage from './HospitalDetailsPage';

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const HospitalMain = ({ openAddWindow, fetchHospitals }) => (
  <div>
    <Row gutter={10}>
      <Col span={4} offset={5}>
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
          shape="circle"
          icon="search"
          onClick={() => fetchHospitals()}
        />

        <Button
          type="primary"
          shape="circle"
          icon="plus"
          onClick={() => openAddWindow()}
          style={{ marginLeft: 10 }}
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
  fetchHospitals: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
  {
    openAddWindow: () => (
      dispatch({
        type: 'EDIT_HOSPITAL_LOGIC',
      })
    ),
    fetchHospitals: () => (
      dispatch({
        type: 'FETCH_HOSPITALS_LOGIC',
      })
    ),
  }
);

const HospitalMainWrapper = connect(
  null,
  mapDispatchToProps,
)(HospitalMain);

export default HospitalMainWrapper;
