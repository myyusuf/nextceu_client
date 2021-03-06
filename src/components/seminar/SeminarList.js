import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Modal from 'antd/lib/modal';
import DatePicker from 'antd/lib/date-picker';
import moment from 'moment';

import SeminarWindow from './SeminarWindow';

const Column = Table.Column;
const confirm = Modal.confirm;
const RangePicker = DatePicker.RangePicker;

class SeminarList extends Component {
  componentWillMount() {
    this.props.setPageTitle();
    this.props.fetchSeminars();
  }

  render() {
    const {
      seminars,
      count,
      pageSize,
      currentPage,
      fetchSeminars,
      openAddWindow,
      openEditWindow,
      confirmDelete,
      searchText,
      searchTextChanged,
      dateRange,
      dateRangeChanged,
      pageChanged,
      loading,
      selectedRowKeys,
      rowKeysChanged,
    } = this.props;

    const rowSelection = {
      type: 'radio',
      selectedRowKeys,
      onChange: (rowKeys, selectedRows) => {
        rowKeysChanged(rowKeys, selectedRows);
      },
    };

    return (
      <div style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Row gutter={10}>
          <Col span={8}>
            <Input
              value={searchText}
              onChange={(e) => {
                searchTextChanged(e.target.value);
              }}
              style={{ marginLeft: 7, marginTop: 20, marginBottom: 20 }}
              placeholder="Code or Name"
            />
          </Col>
          <Col span={11}>
            <RangePicker
              value={dateRange}
              onChange={(date) => {
                dateRangeChanged(date);
              }}
              style={{ marginLeft: 7, marginTop: 20, marginBottom: 20 }}
            />
          </Col>
          <Col span={5}>
            <span>
              <Button
                shape="circle"
                icon="search"
                onClick={() => fetchSeminars()}
                style={{ marginLeft: 0, marginTop: 20, marginBottom: 20 }}
              />
              <Button
                type="primary"
                shape="circle"
                icon="plus"
                onClick={() => openAddWindow()}
                style={{ marginLeft: 7, marginTop: 20, marginBottom: 20 }}
              />
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              dataSource={seminars}
              rowKey="id"
              loading={loading}
              pagination={{
                total: count,
                current: currentPage,
                pageSize,
              }}
              onChange={pagination => pageChanged(pagination.current)}
              rowSelection={rowSelection}
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
                title="Date"
                dataIndex="eventDate"
                key="eventDate"
                render={(text, record) => (
                  <span>
                    {moment(text).format('DD/MM/YYYY')}
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

        <SeminarWindow />
      </div>
    );
  }
}

SeminarList.propTypes = {
  setPageTitle: PropTypes.func.isRequired,
  fetchSeminars: PropTypes.func.isRequired,
  openAddWindow: PropTypes.func.isRequired,
  openEditWindow: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  searchTextChanged: PropTypes.func.isRequired,
  dateRange: PropTypes.arrayOf(PropTypes.shape).isRequired,
  dateRangeChanged: PropTypes.func.isRequired,
  pageChanged: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  seminars: PropTypes.arrayOf(PropTypes.shape).isRequired,
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.shape).isRequired,
  rowKeysChanged: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    seminars: state.seminarReducers.seminars.rows,
    count: state.seminarReducers.seminars.count,
    searchText: state.seminarReducers.seminarSearch.searchText,
    dateRange: state.seminarReducers.seminarSearch.dateRange,
    pageSize: state.seminarReducers.seminarSearch.pageSize,
    currentPage: state.seminarReducers.seminarSearch.currentPage,
    loading: state.seminarReducers.seminarSearch.loading,
    selectedRowKeys: state.seminarReducers.seminarSelection.rowKeys,
  }
);

const mapDispatchToProps = dispatch => (
  {
    setPageTitle: () => {
      dispatch({
        type: 'UPDATE_WORKSPACE_PAGE_TITLE',
        payload: { title: 'Seminar', subTitle: '' },
      });
    },
    fetchSeminars: () => {
      dispatch({
        type: 'FETCH_SEMINARS_LOGIC',
      });

      dispatch({
        type: 'FETCH_ALL_DEPARTMENTS_LOGIC',
      });
    },
    openAddWindow: () => {
      dispatch({
        type: 'EDIT_SEMINAR_LOGIC',
      });

      dispatch({
        type: 'FETCH_ALL_DEPARTMENTS_LOGIC',
      });

      dispatch({
        type: 'FETCH_SUPERVISORS_FOR_SELECT_LOGIC',
      });
    },
    openEditWindow: (record) => {
      dispatch({
        type: 'LOAD_SEMINAR_TO_FORM_LOGIC',
        payload: record,
      });

      dispatch({
        type: 'FETCH_ALL_DEPARTMENTS_LOGIC',
      });

      dispatch({
        type: 'FETCH_SMTS_BY_DEPARTMENT_LOGIC',
        payload: record.SeminarType.DepartmentId,
      });

      dispatch({
        type: 'FETCH_SUPERVISORS_FOR_SELECT_LOGIC',
      });
    },
    searchTextChanged: value => (
      dispatch({
        type: 'SEMINAR_SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
    dateRangeChanged: value => (
      dispatch({
        type: 'SEMINAR_SEARCH_DATE_RANGE_CHANGED',
        payload: value,
      })
    ),
    pageChanged: currentPage => (
      dispatch({
        type: 'SEMINAR_PAGE_CHANGED_LOGIC',
        payload: currentPage,
      })
    ),
    confirmDelete: record => (
      confirm({
        title: `Do you Want to delete seminar: ${record.name}`,
        content: 'This action cannot be undone',
        onOk() {
          dispatch({
            type: 'DELETE_SEMINAR_LOGIC',
            payload: record,
          });
        },
        onCancel() {
          console.log('Cancel');
        },
      })
    ),
    rowKeysChanged: (rowKeys, selectedRows) => (
      dispatch({
        type: 'SEMINAR_SELECT_CHANGED',
        payload: { rowKeys, selectedRows },
      })
    ),
  }
);

const SeminarListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeminarList);

export default SeminarListWrapper;
