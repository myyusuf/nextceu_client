import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'antd/lib/select';

const Option = Select.Option;

const DepartmentSelect = ({ departments, value, onSelect, style }) => (
  <Select
    placeholder="Select Department"
    onSelect={onSelect}
    value={value}
    style={style}
    defaultActiveFirstOption
  >
    {departments.map(department => (
      <Option key={department.id} value={department.id}>{department.name}</Option>
    ))}
  </Select>
);

DepartmentSelect.propTypes = {
  departments: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  value: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  style: PropTypes.shape.isRequired,
};

const mapStateToProps = state => (
  {
    departments: state.departmentReducers.departments,
  }
);

const DepartmentSelectWrapper = connect(
  mapStateToProps,
  null,
)(DepartmentSelect);

export default DepartmentSelectWrapper;
