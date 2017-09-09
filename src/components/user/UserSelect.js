import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'antd/lib/select';

const Option = Select.Option;

const UserSelect = ({ users, value, onSelect }) => (
  <Select
    placeholder="Select User"
    style={{ width: 120 }}
    onSelect={onSelect}
    value={value}
  >
    {users.map(user => (
      <Option value={String(user.id)}>{user.name}</Option>
    ))}
  </Select>
);

UserSelect.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape).isRequired,
  value: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    users: state.userReducers.allUsersByRole,
  }
);

const UserSelectWrapper = connect(
  mapStateToProps,
  null,
)(UserSelect);

export default UserSelectWrapper;
