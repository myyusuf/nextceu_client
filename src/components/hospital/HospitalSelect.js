import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'antd/lib/select';

const { Option, OptGroup } = Select;

const HospitalSelect = ({ hospitals, value, onSelect, style = {} }) => {
  return (
    <Select
      placeholder="Select Hospital"
      onSelect={onSelect}
      value={value}
      style={style}
    >
      <OptGroup label="Hospitals">
        {hospitals.filter(hospital => hospital.hospitalType === 1).map(hospital => (
          <Option key={hospital.id} value={String(hospital.id)}>{hospital.name}</Option>
        ))}
      </OptGroup>
      <OptGroup label="Clinics">
        {hospitals.filter(hospital => hospital.hospitalType === 2).map(hospital => (
          <Option key={hospital.id} value={String(hospital.id)}>{hospital.name}</Option>
        ))}
      </OptGroup>
    </Select>
  );
};

HospitalSelect.propTypes = {
  hospitals: PropTypes.arrayOf(PropTypes.shape).isRequired,
  value: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  style: PropTypes.shape(),
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
