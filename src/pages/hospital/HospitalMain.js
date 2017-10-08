import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Select from 'antd/lib/select';
import DatePicker from 'antd/lib/date-picker';
import Button from 'antd/lib/button';

import HospitalList from '../../components/hospital/HospitalList';
import DepartmentSelect from '../../components/department/DepartmentSelect';
import HospitalDetailsPage from './HospitalDetailsPage';

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

const HospitalMain = ({
  openAddWindow,
  fetchHospitals,
  hospitalDepartment,
  hospitalDepartmentChanged,
  hospitalDateRangeChanged,
  hospitalDateRange,
}) => (
  <div>
    <Row gutter={10}>
      <Col span={4} offset={0}>
        <RangePicker
          value={hospitalDateRange}
          onChange={(date) => {
            hospitalDateRangeChanged(date);
          }}
          style={{ marginLeft: 17, marginTop: 20, marginBottom: 20 }}
        />
      </Col>
      <Col span={4}>
        <DepartmentSelect
          value={hospitalDepartment}
          onSelect={(value) => {
            hospitalDepartmentChanged(value);
          }}
          style={{ width: 190, marginTop: 20, marginBottom: 20 }}
        />
      </Col>
      <Col span={2}>
        <Button
          shape="circle"
          icon="search"
          onClick={() => fetchHospitals()}
          style={{ marginTop: 20, marginBottom: 20 }}
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
      <Col span={18}>
        <HospitalList />
      </Col>
      <Col span={6} style={{ backgroundColor: '#fff' }}>
        <HospitalDetailsPage />
      </Col>
    </Row>
  </div>
);

HospitalMain.propTypes = {
  openAddWindow: PropTypes.func.isRequired,
  fetchHospitals: PropTypes.func.isRequired,
  hospitalDepartment: PropTypes.shape.isRequired,
  hospitalDepartmentChanged: PropTypes.func.isRequired,
  hospitalDateRangeChanged: PropTypes.func.isRequired,
  hospitalDateRange: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

const mapStateToProps = state => (
  {
    hospitalDepartment: state.hospitalReducers.hospitalSearch.hospitalDepartment,
    hospitalDateRange: state.hospitalReducers.hospitalSearch.hospitalDateRange,
  }
);

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
    hospitalDepartmentChanged: value => (
      dispatch({
        type: 'HOSPITAL_SEARCH_DEPARTMENT_CHANGED',
        payload: value,
      })
    ),
    hospitalDateRangeChanged: value => (
      dispatch({
        type: 'HOSPITAL_SEARCH_DATE_RANGE_CHANGED',
        payload: value,
      })
    ),
  }
);

const HospitalMainWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HospitalMain);

export default HospitalMainWrapper;
