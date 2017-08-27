import React from 'react';
import PropTypes from 'prop-types';
import Select from 'antd/lib/select';

const Option = Select.Option;

const StudentLevelSelect = ({ value, onSelect }) => (
  <Select
    placeholder="Select Level"
    style={{ width: 120 }}
    onSelect={onSelect}
    value={value}
  >
    <Option value="1">Level 1</Option>
    <Option value="2">Level 2</Option>
    <Option value="3">UKMPPD Test</Option>
    <Option value="4">Graduate</Option>
  </Select>
);

StudentLevelSelect.propTypes = {
  value: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default StudentLevelSelect;
