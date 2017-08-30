import React from 'react';
import PropTypes from 'prop-types';
import Select from 'antd/lib/select';

const Option = Select.Option;

const HospitalTypeSelect = ({ value, onSelect }) => (
  <Select
    placeholder="Select Type"
    style={{ width: 120 }}
    onSelect={onSelect}
    value={value}
  >
    <Option value="1">Hospital</Option>
    <Option value="2">Clinic</Option>
  </Select>
);

HospitalTypeSelect.propTypes = {
  value: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default HospitalTypeSelect;
