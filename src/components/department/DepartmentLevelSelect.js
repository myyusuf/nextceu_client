import React from 'react';
import PropTypes from 'prop-types';
import Select from 'antd/lib/select';

const Option = Select.Option;

const DepartmentLevelSelect = ({ value, onSelect, style }) => (
  <Select
    placeholder="Select Level"
    onSelect={onSelect}
    value={value}
    size="large"
    style={style}
  >
    <Option value="1">Level 1</Option>
    <Option value="2">Level 2</Option>
  </Select>
);

DepartmentLevelSelect.propTypes = {
  value: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  style: PropTypes.shape,
};

DepartmentLevelSelect.defaultProps = {
  style: {},
};

export default DepartmentLevelSelect;
