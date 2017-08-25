import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';

import UserWindow from './UserWindow';

const columns = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
];

const UserList = ({ users, openAddWindow, searchText, searchTextChanged }) => (
  <div style={{ paddingLeft: 10, paddingRight: 10 }}>
    <Row gutter={10}>
      <Col span={8}>
        <Input
          value={searchText}
          onChange={(e) => {
            searchTextChanged(e.target.value);
          }}
          placeholder="Username"
        />
      </Col>
      <Col span={16}>
        <Button
          type="primary"
          shape="circle"
          icon="plus"
          onClick={() => openAddWindow()}
        />
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <Table columns={columns} dataSource={users} style={{ marginTop: 20 }} />
      </Col>
    </Row>

    <UserWindow />
  </div>
);

UserList.propTypes = {
  openAddWindow: PropTypes.func.isRequired,
  searchText: PropTypes.string,
  searchTextChanged: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

UserList.defaultProps = {
  searchText: '',
};

const mapStateToProps = state => (
  {
    users: state.userReducers.users,
  }
);

const mapDispatchToProps = dispatch => (
  {
    openAddWindow: () => (
      dispatch({
        type: 'ADD_USER_LOGIC',
      })
    ),
    searchTextChanged: value => (
      dispatch({
        type: 'SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
  }
);

const UserListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserList);

export default UserListWrapper;
