import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'antd/lib/select';

const { Option, OptGroup } = Select;

const DepartmentSelect = ({ departments, value, onSelect, style }) => (
  <Select
    placeholder="Select Department"
    onSelect={onSelect}
    value={value}
    style={style}
    defaultActiveFirstOption
  >
    <OptGroup label="Level 1">
      {departments.filter(department => department.level === 1).map(department => (
        <Option key={department.id} value={String(department.id)}>{department.name}</Option>
      ))}
    </OptGroup>
    <OptGroup label="Level 2">
      {departments.filter(department => department.level === 2).map(department => (
        <Option key={department.id} value={String(department.id)}>{department.name}</Option>
      ))}
    </OptGroup>
  </Select>
);

DepartmentSelect.propTypes = {
  departments: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  value: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  style: PropTypes.shape.isRequired,
};

const mapStateToProps = state => (
  {
    departments: state.departmentReducers.departmentsAll,
  }
);

const DepartmentSelectWrapper = connect(
  mapStateToProps,
  null,
)(DepartmentSelect);

export default DepartmentSelectWrapper;
