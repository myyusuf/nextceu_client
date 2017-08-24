import React from 'react';
import Select from 'antd/lib/select';

const Option = Select.Option;

const StudentLevelSelect = () => (
  <Select defaultValue="1" style={{ width: 120 }}>
    <Option value="1">Level 1</Option>
    <Option value="2">Level 2</Option>
    <Option value="3">Ujian UKMPPD</Option>
    <Option value="4">Lulus</Option>
  </Select>
);

export default StudentLevelSelect;
