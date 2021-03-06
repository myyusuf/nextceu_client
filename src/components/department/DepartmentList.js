import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Modal from 'antd/lib/modal';

import DepartmentWindow from './DepartmentWindow';
import DepartmentLevelSelect from './DepartmentLevelSelect';

const Column = Table.Column;
const confirm = Modal.confirm;

class DepartmentList extends Component {
  componentWillMount() {
    this.props.fetchDepartments();
  }

  render() {
    const {
      departments,
      fetchDepartments,
      openAddWindow,
      openEditWindow,
      confirmDelete,
      searchText,
      searchTextChanged,
      searchLevel,
      searchLevelChanged,
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
              style={{ height: 32 }}
            />
          </Col>
          <Col span={4}>
            <DepartmentLevelSelect
              value={searchLevel}
              onSelect={(value) => {
                searchLevelChanged(value);
              }}
              style={{ width: '100%' }}
            />
          </Col>
          <Col span={12}>
            <span>
              <Button
                shape="circle"
                icon="search"
                onClick={() => fetchDepartments()}
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
            <Table dataSource={departments} style={{ marginTop: 20 }} rowKey="id" loading={loading} size="middle">
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
                title="Duration"
                dataIndex="duration"
                key="duration"
              />
              <Column
                title="Color"
                dataIndex="color"
                key="color"
                render={(text, record) => (
                  <div
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: '50%',
                      backgroundColor: record.color }}
                  />
                )}
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

        <DepartmentWindow />
      </div>
    );
  }
}

DepartmentList.propTypes = {
  fetchDepartments: PropTypes.func.isRequired,
  openAddWindow: PropTypes.func.isRequired,
  openEditWindow: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  searchTextChanged: PropTypes.func.isRequired,
  searchLevel: PropTypes.string.isRequired,
  searchLevelChanged: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  departments: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = state => (
  {
    departments: state.departmentReducers.departments,
    searchText: state.departmentReducers.departmentSearch.searchText,
    searchLevel: state.departmentReducers.departmentSearch.searchLevel,
    loading: state.departmentReducers.departmentSearch.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchDepartments: () => (
      dispatch({
        type: 'FETCH_DEPARTMENTS_LOGIC',
      })
    ),
    openAddWindow: () => (
      dispatch({
        type: 'EDIT_DEPARTMENT_LOGIC',
      })
    ),
    openEditWindow: record => (
      dispatch({
        type: 'LOAD_DEPARTMENT_TO_FORM_LOGIC',
        payload: record,
      })
    ),
    searchTextChanged: value => (
      dispatch({
        type: 'DEPARTMENT_SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
    searchLevelChanged: value => (
      dispatch({
        type: 'DEPARTMENT_SEARCH_LEVEL_CHANGED',
        payload: value,
      })
    ),
    confirmDelete: record => (
      confirm({
        title: `Do you Want to delete department: ${record.name}`,
        content: 'This action cannot be undone',
        onOk() {
          dispatch({
            type: 'DELETE_DEPARTMENT_LOGIC',
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

const DepartmentListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DepartmentList);

export default DepartmentListWrapper;
