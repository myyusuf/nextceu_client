import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Modal from 'antd/lib/modal';

import RoleWindow from './RoleWindow';

const Column = Table.Column;
const confirm = Modal.confirm;

class RoleList extends Component {
  componentWillMount() {
    this.props.fetchRoles();
  }

  render() {
    const { roles, openAddWindow, searchText, searchTextChanged } = this.props;
    return (
      <div style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Row gutter={10}>
          <Col span={8}>
            <Input
              value={searchText}
              onChange={(e) => {
                searchTextChanged(e.target.value);
              }}
              placeholder="Code"
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
            <Table dataSource={roles} style={{ marginTop: 20 }} rowKey="id">
              <Column
                title="Code"
                dataIndex="code"
                key="code"
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
                      onClick={() => this.props.openEditWindow(record)}
                      style={{ marginRight: 5 }}
                    />
                    <Button
                      type="danger"
                      icon="delete"
                      onClick={() => this.props.confirmDelete(record)}
                    />
                  </span>
                )}
              />
            </Table>
          </Col>
        </Row>

        <RoleWindow />
      </div>
    );
  }
}

RoleList.propTypes = {
  fetchRoles: PropTypes.func.isRequired,
  openAddWindow: PropTypes.func.isRequired,
  openEditWindow: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  searchText: PropTypes.string,
  searchTextChanged: PropTypes.func.isRequired,
  roles: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

RoleList.defaultProps = {
  searchText: '',
};

const mapStateToProps = state => (
  {
    roles: state.userReducers.roles,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchRoles: () => (
      dispatch({
        type: 'FETCH_ROLES_LOGIC',
      })
    ),
    openAddWindow: () => (
      dispatch({
        type: 'EDIT_ROLE_LOGIC',
      })
    ),
    openEditWindow: record => (
      dispatch({
        type: 'LOAD_ROLE_TO_FORM_LOGIC',
        payload: record,
      })
    ),
    searchTextChanged: value => (
      dispatch({
        type: 'SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
    confirmDelete: record => (
      confirm({
        title: `Do you Want to delete role: ${record.name}`,
        content: 'This action cannot be undone',
        onOk() {
          dispatch({
            type: 'DELETE_ROLE_LOGIC',
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

const RoleListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RoleList);

export default RoleListWrapper;
