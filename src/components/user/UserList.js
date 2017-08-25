import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Modal from 'antd/lib/modal';

import UserWindow from './UserWindow';

const Column = Table.Column;
const confirm = Modal.confirm;

class UserList extends Component {
  componentWillMount() {
    this.props.fetchUsers();
  }

  render() {
    const {
      users,
      fetchUsers,
      openAddWindow,
      openEditWindow,
      confirmDelete,
      searchText,
      searchTextChanged,
      loading,
    } = this.props;
    return (
      <div style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Row gutter={10}>
          <Col span={8}>
            <Input
              value={searchText}
              onChange={(e) => {
                searchTextChanged(e.target.value);
              }}
              placeholder="Username or Name"
            />
          </Col>
          <Col span={16}>
            <span>
              <Button
                shape="circle"
                icon="search"
                onClick={() => fetchUsers()}
                style={{ marginRight: 15 }}
              />
              <Button
                type="primary"
                shape="circle"
                icon="plus"
                onClick={() => openAddWindow()}
              />
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table dataSource={users} style={{ marginTop: 20 }} rowKey="id" loading={loading}>
              <Column
                title="Username"
                dataIndex="username"
                key="username"
              />
              <Column
                title="Name"
                dataIndex="name"
                key="name"
              />
              <Column
                title="Action"
                key="action"
                render={(text, record) => (
                  <span>
                    <Button
                      icon="edit"
                      onClick={() => openEditWindow(record)}
                      style={{ marginRight: 5 }}
                    />
                    <Button
                      type="danger"
                      icon="delete"
                      onClick={() => confirmDelete(record)}
                    />
                  </span>
                )}
              />
            </Table>
          </Col>
        </Row>

        <UserWindow />
      </div>
    );
  }
}

UserList.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  openAddWindow: PropTypes.func.isRequired,
  openEditWindow: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  searchTextChanged: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = state => (
  {
    users: state.userReducers.users,
    searchText: state.userReducers.userSearch.searchText,
    loading: state.userReducers.userSearch.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchUsers: () => (
      dispatch({
        type: 'FETCH_USERS_LOGIC',
      })
    ),
    openAddWindow: () => (
      dispatch({
        type: 'EDIT_USER_LOGIC',
      })
    ),
    openEditWindow: record => (
      dispatch({
        type: 'LOAD_USER_TO_FORM_LOGIC',
        payload: record,
      })
    ),
    searchTextChanged: value => (
      dispatch({
        type: 'USER_SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
    confirmDelete: record => (
      confirm({
        title: `Do you Want to delete user: ${record.name}`,
        content: 'This action cannot be undone',
        onOk() {
          dispatch({
            type: 'DELETE_USER_LOGIC',
            payload: record,
          });
        },
        onCancel() {
          console.log('Cancel');
        },
      })
    ),
  }
);

const UserListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserList);

export default UserListWrapper;
