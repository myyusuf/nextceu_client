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

import AssistanceWindow from './AssistanceWindow';

const Column = Table.Column;
const confirm = Modal.confirm;
const RangePicker = DatePicker.RangePicker;

class AssistanceList extends Component {
  componentWillMount() {
    this.props.fetchAssistances();
  }

  render() {
    const {
      assistances,
      count,
      pageSize,
      currentPage,
      fetchAssistances,
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
              placeholder="Code or Name"
            />
          </Col>
          <Col span={11}>
            <RangePicker
              value={dateRange}
              onChange={(date) => {
                dateRangeChanged(date);
              }}
            />
          </Col>
          <Col span={5}>
            <span>
              <Button
                shape="circle"
                icon="search"
                onClick={() => fetchAssistances()}
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
              dataSource={assistances}
              style={{ marginTop: 20 }}
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

        <AssistanceWindow />
      </div>
    );
  }
}

AssistanceList.propTypes = {
  fetchAssistances: PropTypes.func.isRequired,
  openAddWindow: PropTypes.func.isRequired,
  openEditWindow: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  searchTextChanged: PropTypes.func.isRequired,
  dateRange: PropTypes.arrayOf(PropTypes.shape).isRequired,
  dateRangeChanged: PropTypes.func.isRequired,
  pageChanged: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  assistances: PropTypes.arrayOf(PropTypes.shape).isRequired,
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.shape).isRequired,
  rowKeysChanged: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    assistances: state.assistanceReducers.assistances.rows,
    count: state.assistanceReducers.assistances.count,
    searchText: state.assistanceReducers.assistanceSearch.searchText,
    dateRange: state.assistanceReducers.assistanceSearch.dateRange,
    pageSize: state.assistanceReducers.assistanceSearch.pageSize,
    currentPage: state.assistanceReducers.assistanceSearch.currentPage,
    loading: state.assistanceReducers.assistanceSearch.loading,
    selectedRowKeys: state.assistanceReducers.assistanceSelection.rowKeys,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchAssistances: () => {
      dispatch({
        type: 'FETCH_ASSISTANCES_LOGIC',
      });
    },
    openAddWindow: () => {
      dispatch({
        type: 'EDIT_ASSISTANCE_LOGIC',
      });

      dispatch({
        type: 'FETCH_TUTORS_FOR_SELECT_LOGIC',
      });
    },
    openEditWindow: (record) => {
      dispatch({
        type: 'LOAD_ASSISTANCE_TO_FORM_LOGIC',
        payload: record,
      });

      dispatch({
        type: 'FETCH_TUTORS_FOR_SELECT_LOGIC',
      });
    },
    searchTextChanged: value => (
      dispatch({
        type: 'ASSISTANCE_SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
    dateRangeChanged: value => (
      dispatch({
        type: 'ASSISTANCE_SEARCH_DATE_RANGE_CHANGED',
        payload: value,
      })
    ),
    pageChanged: currentPage => (
      dispatch({
        type: 'ASSISTANCE_PAGE_CHANGED_LOGIC',
        payload: currentPage,
      })
    ),
    confirmDelete: record => (
      confirm({
        title: `Do you Want to delete assistance: ${record.name}`,
        content: 'This action cannot be undone',
        onOk() {
          dispatch({
            type: 'DELETE_ASSISTANCE_LOGIC',
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
        type: 'ASSISTANCE_SELECT_CHANGED',
        payload: { rowKeys, selectedRows },
      })
    ),
  }
);

const AssistanceListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AssistanceList);

export default AssistanceListWrapper;
