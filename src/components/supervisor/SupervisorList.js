import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Modal from 'antd/lib/modal';

import SupervisorWindow from './SupervisorWindow';

const Column = Table.Column;
const confirm = Modal.confirm;

class SupervisorList extends Component {
  componentWillMount() {
    this.props.fetchSupervisors();
  }

  render() {
    const {
      supervisors,
      count,
      pageSize,
      currentPage,
      fetchSupervisors,
      openAddWindow,
      openEditWindow,
      confirmDelete,
      searchText,
      searchTextChanged,
      pageChanged,
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
              placeholder="Code or Name"
            />
          </Col>
          <Col span={16}>
            <span>
              <Button
                shape="circle"
                icon="search"
                onClick={() => fetchSupervisors()}
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
              dataSource={supervisors}
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

        <SupervisorWindow />
      </div>
    );
  }
}

SupervisorList.propTypes = {
  fetchSupervisors: PropTypes.func.isRequired,
  openAddWindow: PropTypes.func.isRequired,
  openEditWindow: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  searchTextChanged: PropTypes.func.isRequired,
  pageChanged: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  supervisors: PropTypes.arrayOf(PropTypes.shape).isRequired,
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

const mapStateToProps = state => (
  {
    supervisors: state.supervisorReducers.supervisors.rows,
    count: state.supervisorReducers.supervisors.count,
    searchText: state.supervisorReducers.supervisorSearch.searchText,
    pageSize: state.supervisorReducers.supervisorSearch.pageSize,
    currentPage: state.supervisorReducers.supervisorSearch.currentPage,
    loading: state.supervisorReducers.supervisorSearch.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchSupervisors: () => {
      dispatch({
        type: 'FETCH_SUPERVISORS_LOGIC',
      });
    },
    openAddWindow: () => (
      dispatch({
        type: 'EDIT_SUPERVISOR_LOGIC',
      })
    ),
    openEditWindow: record => (
      dispatch({
        type: 'LOAD_SUPERVISOR_TO_FORM_LOGIC',
        payload: record,
      })
    ),
    searchTextChanged: value => (
      dispatch({
        type: 'SUPERVISOR_SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
    pageChanged: currentPage => (
      dispatch({
        type: 'SUPERVISOR_PAGE_CHANGED_LOGIC',
        payload: currentPage,
      })
    ),
    confirmDelete: record => (
      confirm({
        title: `Do you Want to delete supervisor: ${record.name}`,
        content: 'This action cannot be undone',
        onOk() {
          dispatch({
            type: 'DELETE_SUPERVISOR_LOGIC',
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

const SupervisorListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SupervisorList);

export default SupervisorListWrapper;
