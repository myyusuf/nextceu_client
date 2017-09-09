import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'antd/lib/select';

const Option = Select.Option;

const HospitalSelect = ({ hospitals, value, onSelect, style = {} }) => (
  <Select
    placeholder="Select Hospital"
    onSelect={onSelect}
    value={value}
    style={style}
  >
    {hospitals.map(hospital => (
      <Option value={String(hospital.id)}>{hospital.name}</Option>
    ))}
  </Select>
);

HospitalSelect.propTypes = {
  hospitals: PropTypes.arrayOf(PropTypes.shape).isRequired,
  value: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  style: PropTypes.shape,
};

const mapStateToProps = state => (
  {
    hospitals: state.hospitalReducers.allHospitals,
  }
);

const HospitalSelectWrapper = connect(
  mapStateToProps,
  null,
)(HospitalSelect);

export default HospitalSelectWrapper;
