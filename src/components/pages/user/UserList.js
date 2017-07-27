import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';

const UserList = ({ users, onUserEdit, onUserDelete }) => (
  <Table responsive fill>
    <thead>
      <tr>
        <th>No</th>
        <th>Username</th>
        <th>Name</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      { users.map((user, index) => (
        <tr key={user.id}>
          <td>{ index + 1 }</td>
          <td>{user.username}</td>
          <td>{user.name}</td>
          <td>{user.role.name}</td>
          <td>
            <Button
              bsStyle="default" style={{ marginRight: 5 }} bsSize="small"
              onClick={() => onUserEdit(user)}
            >
              <i className="fa fa-edit" />
            </Button>
            <Button bsStyle="danger" bsSize="small" onClick={() => onUserDelete(user)}>
              <i className="fa fa-remove" />
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }),
    }).isRequired,
  ).isRequired,
  onUserEdit: PropTypes.func.isRequired,
  onUserDelete: PropTypes.func.isRequired,
};

export default UserList;
