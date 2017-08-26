import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'antd/lib/select';

const Option = Select.Option;

const RoleSelect = ({ roles, onSelect }) => (
  <Select defaultValue="1" style={{ width: 120 }} onSelect={onSelect}>
    {roles.map(role => (
      <Option value={role.id}>{role.name}</Option>
    ))}
  </Select>
);

RoleSelect.propTypes = {
  roles: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    roles: state.userReducers.roles,
  }
);

const RoleSelectWrapper = connect(
  mapStateToProps,
  null,
)(RoleSelect);

export default RoleSelectWrapper;
