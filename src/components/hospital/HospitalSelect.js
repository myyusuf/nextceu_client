import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'antd/lib/select';

const Option = Select.Option;

const HospitalSelect = ({ hospitals, value, onSelect, style = {}, hospitalType = null }) => {
  let options = [];
  if (hospitalType) {
    if (hospitalType === 'clinic') {
      options = hospitals.filter(hospital => (hospital.hospitalType === 2))
      .map(hospital => (
        <Option value={String(hospital.id)}>{hospital.name}</Option>
      ));
    } else {
      options = hospitals.filter(hospital => (hospital.hospitalType === 1))
      .map(hospital => (
        <Option value={String(hospital.id)}>{hospital.name}</Option>
      ));
    }
  } else {
    options = hospitals.map(hospital => (
      <Option value={String(hospital.id)}>{hospital.name}</Option>
    ));
  }
  return (
    <Select
      placeholder="Select Hospital"
      onSelect={onSelect}
      value={value}
      style={style}
    >
      {options}
    </Select>
  );
};

HospitalSelect.propTypes = {
  hospitals: PropTypes.arrayOf(PropTypes.shape).isRequired,
  value: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  style: PropTypes.shape,
  hospitalType: PropTypes.string,
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
