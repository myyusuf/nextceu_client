import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'antd/lib/select';

const Option = Select.Option;

const SupervisorSelect = ({ supervisors, value, onChange, style }) => (
  <Select
    placeholder="Select Supervisor"
    onChange={onChange}
    value={value}
    style={style}
    allowClear
  >
    {supervisors.map(supervisor => (
      <Option value={String(supervisor.id)}>{supervisor.name}</Option>
    ))}
  </Select>
);

SupervisorSelect.propTypes = {
  supervisors: PropTypes.arrayOf(PropTypes.shape).isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.shape(),
};

SupervisorSelect.defaultProps = {
  style: {},
};

const mapStateToProps = state => (
  {
    supervisors: state.supervisorReducers.supervisorsForSelect,
  }
);

const SupervisorSelectWrapper = connect(
  mapStateToProps,
  null,
)(SupervisorSelect);

export default SupervisorSelectWrapper;
