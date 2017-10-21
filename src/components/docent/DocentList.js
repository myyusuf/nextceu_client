import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Modal from 'antd/lib/modal';

import DocentWindow from './DocentWindow';
import DepartmentSelect from '../department/DepartmentSelect';
import HospitalSelect from '../hospital/HospitalSelect';

const Column = Table.Column;
const confirm = Modal.confirm;

class DocentList extends Component {
  componentWillMount() {
    this.props.fetchDocents();
  }

  render() {
    const {
      docents,
      count,
      pageSize,
      currentPage,
      fetchDocents,
      openAddWindow,
      openEditWindow,
      confirmDelete,
      searchText,
      searchTextChanged,
      searchDepartment,
      searchDepartmentChanged,
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
              placeholder="Code or Name"
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
          <Col span={4}>
            <DepartmentSelect
              value={searchDepartment}
              onSelect={(value) => {
                searchDepartmentChanged(value);
              }}
              style={{ width: '100%' }}
              allowClear
            />
          </Col>
          <Col span={8}>
            <span>
              <Button
                shape="circle"
                icon="search"
                onClick={() => fetchDocents()}
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
              dataSource={docents}
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
                title="Hospital"
                dataIndex="Hospital.name"
              />
              <Column
                title="Department"
                dataIndex="Department.name"
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

        <DocentWindow />
      </div>
    );
  }
}

DocentList.propTypes = {
  fetchDocents: PropTypes.func.isRequired,
  openAddWindow: PropTypes.func.isRequired,
  openEditWindow: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  searchTextChanged: PropTypes.func.isRequired,
  searchHospital: PropTypes.string.isRequired,
  searchHospitalChanged: PropTypes.func.isRequired,
  searchDepartment: PropTypes.string.isRequired,
  searchDepartmentChanged: PropTypes.func.isRequired,
  pageChanged: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  docents: PropTypes.arrayOf(PropTypes.shape).isRequired,
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

const mapStateToProps = state => (
  {
    docents: state.docentReducers.docents.rows,
    count: state.docentReducers.docents.count,
    searchText: state.docentReducers.docentSearch.searchText,
    searchHospital: state.docentReducers.docentSearch.searchHospital,
    searchDepartment: state.docentReducers.docentSearch.searchDepartment,
    pageSize: state.docentReducers.docentSearch.pageSize,
    currentPage: state.docentReducers.docentSearch.currentPage,
    loading: state.docentReducers.docentSearch.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchDocents: () => {
      dispatch({
        type: 'FETCH_DOCENTS_LOGIC',
      });

      dispatch({
        type: 'FETCH_ALL_HOSPITALS_LOGIC',
      });

      dispatch({
        type: 'FETCH_ALL_DEPARTMENTS_LOGIC',
      });
    },
    openAddWindow: () => (
      dispatch({
        type: 'EDIT_DOCENT_LOGIC',
      })
    ),
    openEditWindow: record => (
      dispatch({
        type: 'LOAD_DOCENT_TO_FORM_LOGIC',
        payload: record,
      })
    ),
    searchTextChanged: value => (
      dispatch({
        type: 'DOCENT_SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
    searchDepartmentChanged: value => (
      dispatch({
        type: 'DOCENT_SEARCH_DEPARTMENT_CHANGED',
        payload: value,
      })
    ),
    searchHospitalChanged: value => (
      dispatch({
        type: 'DOCENT_SEARCH_HOSPITAL_CHANGED',
        payload: value,
      })
    ),
    pageChanged: currentPage => (
      dispatch({
        type: 'DOCENT_PAGE_CHANGED_LOGIC',
        payload: currentPage,
      })
    ),
    confirmDelete: record => (
      confirm({
        title: `Do you Want to delete docent: ${record.name}`,
        content: 'This action cannot be undone',
        onOk() {
          dispatch({
            type: 'DELETE_DOCENT_LOGIC',
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

const DocentListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DocentList);

export default DocentListWrapper;
