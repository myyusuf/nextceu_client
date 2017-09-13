import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import DatePicker from 'antd/lib/date-picker';

import * as actions from '../../../actions/ActionType';
import ExportToPreTestWindow from './ExportToPreTestWindow';

const Column = Table.Column;
const RangePicker = DatePicker.RangePicker;

class InitiateCourseReport extends Component {
  componentWillMount() {
    this.props.fetchCourses();
  }

  render() {
    const {
      courses,
      count,
      pageSize,
      currentPage,
      fetchCourses,
      openExportWindow,
      searchText,
      searchTextChanged,
      pageChanged,
      loading,
      dateRange,
      dateRangeChanged,
      selectedRowKeys,
      rowKeysChanged,
    } = this.props;

    const rowSelection = {
      type: 'checkbox',
      selectedRowKeys,
      onChange: (rowKeys, selectedRows) => {
        rowKeysChanged(rowKeys, selectedRows);
      },
    };

    return (
      <div style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Row gutter={10}>
          <Col span={6}>
            <RangePicker
              value={dateRange}
              onChange={(date) => {
                dateRangeChanged(date);
              }}
            />
          </Col>
          <Col span={6}>
            <Input
              value={searchText}
              onChange={(e) => {
                searchTextChanged(e.target.value);
              }}
              placeholder="SID or Name"
            />
          </Col>
          <Col span={8}>
            <span>
              <Button
                shape="circle"
                icon="search"
                onClick={() => fetchCourses()}
                style={{ marginRight: 15 }}
              />
              <Button
                shape="circle"
                icon="export"
                onClick={() => openExportWindow()}
                style={{ backgroundColor: '#50C14E', color: '#fff' }}
              />
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              dataSource={courses}
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
              rowSelection={rowSelection}
            >
              <Column
                title="Title"
                dataIndex="title"
                key="title"
              />
              <Column
                title="Plan Start Date"
                dataIndex="planStartDate"
                key="planStartDate"
                render={text => (
                  <span>
                    {moment(text).format('DD/MM/YYYY')}
                  </span>
                )}
              />
              <Column
                title="Old SID"
                dataIndex="Student.oldSid"
              />
              <Column
                title="New SID"
                dataIndex="Student.newSid"
              />
              <Column
                title="Name"
                dataIndex="Student.name"
              />
            </Table>
          </Col>
        </Row>
        <ExportToPreTestWindow />
      </div>
    );
  }
}

InitiateCourseReport.propTypes = {
  fetchCourses: PropTypes.func.isRequired,
  openExportWindow: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  searchTextChanged: PropTypes.func.isRequired,
  pageChanged: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  courses: PropTypes.arrayOf(PropTypes.shape).isRequired,
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  dateRangeChanged: PropTypes.func.isRequired,
  dateRange: PropTypes.arrayOf(PropTypes.shape).isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.shape).isRequired,
  rowKeysChanged: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    courses: state.reportReducers.initiateCourses.rows,
    count: state.reportReducers.initiateCourses.count,
    searchText: state.reportReducers.initiateCourseSearch.searchText,
    pageSize: state.reportReducers.initiateCourseSearch.pageSize,
    currentPage: state.reportReducers.initiateCourseSearch.currentPage,
    loading: state.reportReducers.initiateCourseSearch.loading,
    dateRange: state.reportReducers.initiateCourseSearch.dateRange,
    selectedRowKeys: state.reportReducers.initiateCourseSelection.rowKeys,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchCourses: () => {
      dispatch({
        type: actions.report.student.initiateCourse.fetchCourses,
      });
    },
    openExportWindow: () => {
      dispatch({
        type: actions.report.student.initiateXpt.form.clear,
      });
      dispatch({
        type: actions.report.student.initiateXpt.window.open,
      });
    },
    searchTextChanged: value => (
      dispatch({
        type: actions.report.student.initiateXpt.list.search.textChanged,
        payload: value,
      })
    ),
    pageChanged: currentPage => (
      dispatch({
        type: actions.report.student.initiateXpt.list.search.pageChanged,
        payload: currentPage,
      })
    ),
    dateRangeChanged: value => (
      dispatch({
        type: actions.report.student.initiateXpt.list.search.dateRangeChanged,
        payload: value,
      })
    ),
    rowKeysChanged: (rowKeys, selectedRows) => (
      dispatch({
        type: actions.report.student.initiateXpt.list.selection.selectChanged,
        payload: { rowKeys, selectedRows },
      })
    ),
  }
);

const InitiateCourseListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InitiateCourseReport);

export default InitiateCourseListWrapper;
