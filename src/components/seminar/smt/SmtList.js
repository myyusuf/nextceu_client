import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Modal from 'antd/lib/modal';
import Checkbox from 'antd/lib/checkbox';

import SmtWindow from './SmtWindow';
import DepartmentSelect from '../../department/DepartmentSelect';

const Column = Table.Column;
const confirm = Modal.confirm;

class SmtList extends Component {
  componentWillMount() {
    this.props.fetchSmts();
  }

  render() {
    const {
      smts,
      fetchSmts,
      openAddWindow,
      openEditWindow,
      confirmDelete,
      searchText,
      searchTextChanged,
      searchDepartment,
      searchDepartmentChanged,
      loading,
    } = this.props;
    return (
      <div style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Row gutter={10}>
          <Col span={4}>
            <Input
              value={searchText}
              onChange={(e) => {
                searchTextChanged(e.target.value);
              }}
              placeholder="Code or Name"
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
          <Col span={16}>
            <span>
              <Button
                shape="circle"
                icon="search"
                onClick={() => fetchSmts()}
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
            <Table dataSource={smts} style={{ marginTop: 20 }} rowKey="id" loading={loading} size="middle">
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
                title="Department"
                dataIndex="Department.name"
              />
              <Column
                title="Active"
                dataIndex="active"
                render={(text, record) => (
                  <span>
                    <Checkbox checked={record.active} />
                  </span>
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

        <SmtWindow />
      </div>
    );
  }
}

SmtList.propTypes = {
  fetchSmts: PropTypes.func.isRequired,
  openAddWindow: PropTypes.func.isRequired,
  openEditWindow: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  searchTextChanged: PropTypes.func.isRequired,
  searchDepartment: PropTypes.string.isRequired,
  searchDepartmentChanged: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  smts: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

// SmtList.defaultProps = {
//   searchText: '',
// };

const mapStateToProps = state => (
  {
    smts: state.seminarReducers.smts,
    searchText: state.seminarReducers.smtSearch.searchText,
    searchDepartment: state.seminarReducers.smtSearch.searchDepartment,
    loading: state.seminarReducers.smtSearch.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchSmts: () => {
      dispatch({
        type: 'FETCH_SMTS_LOGIC',
      });

      dispatch({
        type: 'FETCH_ALL_DEPARTMENTS_LOGIC',
      });
    },
    openAddWindow: () => {
      dispatch({
        type: 'EDIT_SMT_LOGIC',
      });

      dispatch({
        type: 'FETCH_ALL_DEPARTMENTS_LOGIC',
      });
    },
    openEditWindow: (record) => {
      dispatch({
        type: 'LOAD_SMT_TO_FORM_LOGIC',
        payload: record,
      });

      dispatch({
        type: 'FETCH_ALL_DEPARTMENTS_LOGIC',
      });
    },
    searchTextChanged: value => (
      dispatch({
        type: 'SMT_SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
    searchDepartmentChanged: value => (
      dispatch({
        type: 'SMT_SEARCH_DEPARTMENT_CHANGED',
        payload: value,
      })
    ),
    confirmDelete: record => (
      confirm({
        title: `Do you Want to delete seminar type: ${record.name}`,
        content: 'This action cannot be undone',
        onOk() {
          dispatch({
            type: 'DELETE_SMT_LOGIC',
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

const SmtListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SmtList);

export default SmtListWrapper;
