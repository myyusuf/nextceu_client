import React from 'react';
import PropTypes from 'prop-types';
import Select from 'antd/lib/select';

const Option = Select.Option;

const DepartmentLevelSelect = ({ value, onSelect }) => (
  <Select
    placeholder="Select Level"
    style={{ width: 120 }}
    onSelect={onSelect}
    value={value}
  >
    <Option value={1}>Level 1</Option>
    <Option value={2}>Level 2</Option>
  </Select>
);

DepartmentLevelSelect.propTypes = {
  value: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default DepartmentLevelSelect;