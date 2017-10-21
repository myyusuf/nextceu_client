import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Modal from 'antd/lib/modal';

import HospitalUserWindow from './HospitalUserWindow';
import HospitalSelect from '../hospital/HospitalSelect';

const Column = Table.Column;
const confirm = Modal.confirm;

class HospitalUserList extends Component {
  componentWillMount() {
    this.props.fetchHospitalUsers();
  }

  render() {
    const {
      hospitalUsers,
      count,
      pageSize,
      currentPage,
      fetchHospitalUsers,
      openAddWindow,
      openEditWindow,
      confirmDelete,
      searchText,
      searchTextChanged,
      searchHospital,
      searchHospitalChanged,
      pageChanged,
      loading,
    } = this.props;
    return (
      <div style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Row gutter={10}>
          <Col span={6}>
            <Input
              value={searchText}
              onChange={(e) => {
                searchTextChanged(e.target.value);
              }}
              placeholder="Username or Name"
            />
          </Col>
          <Col span={4}>
            <HospitalSelect
              value={searchHospital}
              onSelect={(value) => {
                searchHospitalChanged(value);
              }}
              style={{ width: '100%' }}
              allowClear
            />
          </Col>
          <Col span={14}>
            <span>
              <Button
                shape="circle"
                icon="search"
                onClick={() => fetchHospitalUsers()}
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
            <Table
              dataSource={hospitalUsers}
              style={{ marginTop: 20 }}
              rowKey="id"
              loading={loading}
              pagination={{
                total: count,
                current: currentPage,
                pageSize,
              }}
              onChange={pagination => pageChanged(pagination.current)}
              size="middle"
            >
              <Column
                title="Username"
                dataIndex="User.username"
              />
              <Column
                title="Name"
                dataIndex="User.name"
              />
              <Column
                title="Hospital"
                dataIndex="Hospital.name"
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

        <HospitalUserWindow />
      </div>
    );
  }
}

HospitalUserList.propTypes = {
  fetchHospitalUsers: PropTypes.func.isRequired,
  openAddWindow: PropTypes.func.isRequired,
  openEditWindow: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  searchTextChanged: PropTypes.func.isRequired,
  searchHospital: PropTypes.string.isRequired,
  searchHospitalChanged: PropTypes.func.isRequired,
  pageChanged: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  hospitalUsers: PropTypes.arrayOf(PropTypes.shape).isRequired,
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

const mapStateToProps = state => (
  {
    hospitalUsers: state.settingsReducers.hospitalUsers.rows,
    count: state.settingsReducers.hospitalUsers.count,
    searchText: state.settingsReducers.hospitalUserSearch.searchText,
    searchHospital: state.settingsReducers.hospitalUserSearch.searchHospital,
    pageSize: state.settingsReducers.hospitalUserSearch.pageSize,
    currentPage: state.settingsReducers.hospitalUserSearch.currentPage,
    loading: state.settingsReducers.hospitalUserSearch.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchHospitalUsers: () => {
      dispatch({
        type: 'FETCH_ALL_USERS_BY_ROLE_LOGIC',
        payload: 'BAKORDIK',
      });

      dispatch({
        type: 'FETCH_ALL_HOSPITALS_LOGIC',
      });

      dispatch({
        type: 'FETCH_HOSPITAL_USERS_LOGIC',
      });
    },
    openAddWindow: () => (
      dispatch({
        type: 'EDIT_HOSPITAL_USER_LOGIC',
      })
    ),
    openEditWindow: record => (
      dispatch({
        type: 'LOAD_HOSPITAL_USER_TO_FORM_LOGIC',
        payload: record,
      })
    ),
    searchTextChanged: value => (
      dispatch({
        type: 'HOSPITAL_USER_SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
    searchHospitalChanged: value => (
      dispatch({
        type: 'HOSPITAL_USER_SEARCH_HOSPITAL_CHANGED',
        payload: value,
      })
    ),
    pageChanged: currentPage => (
      dispatch({
        type: 'HOSPITAL_USER_PAGE_CHANGED_LOGIC',
        payload: currentPage,
      })
    ),
    confirmDelete: record => (
      confirm({
        title: `Do you Want to delete hospital user: ${record.User.name}`,
        content: 'This action cannot be undone',
        onOk() {
          dispatch({
            type: 'DELETE_HOSPITAL_USER_LOGIC',
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

const HospitalUserListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HospitalUserList);

export default HospitalUserListWrapper;
