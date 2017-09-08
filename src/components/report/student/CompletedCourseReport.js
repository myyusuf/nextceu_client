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

import ExportToPreTestWindow from './ExportToPreTestWindow';

const Column = Table.Column;
const RangePicker = DatePicker.RangePicker;

class CompletedCourseList extends Component {
  componentWillMount() {
    this.props.fetchCompletedCourses();
  }

  render() {
    const {
      completedCourses,
      count,
      pageSize,
      currentPage,
      fetchCompletedCourses,
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
                onClick={() => fetchCompletedCourses()}
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
              dataSource={completedCourses}
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
                title="End Date"
                dataIndex="realEndDate"
                key="realEndDate"
                render={(text, record) => (
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

CompletedCourseList.propTypes = {
  fetchCompletedCourses: PropTypes.func.isRequired,
  openExportWindow: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  searchTextChanged: PropTypes.func.isRequired,
  pageChanged: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  completedCourses: PropTypes.arrayOf(PropTypes.shape).isRequired,
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
    completedCourses: state.reportReducers.completedCourses.rows,
    count: state.reportReducers.completedCourses.count,
    searchText: state.reportReducers.completedCourseSearch.searchText,
    pageSize: state.reportReducers.completedCourseSearch.pageSize,
    currentPage: state.reportReducers.completedCourseSearch.currentPage,
    loading: state.reportReducers.completedCourseSearch.loading,
    dateRange: state.reportReducers.completedCourseSearch.dateRange,
    selectedRowKeys: state.reportReducers.completedCourseSelection.rowKeys,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchCompletedCourses: () => {
      dispatch({
        type: 'FETCH_COMPLETED_COURSES_LOGIC',
      });
    },
    openExportWindow: () => (
      dispatch({
        type: 'PREP_EXPORT_TO_PRE_TEST_LOGIC',
      })
    ),
    searchTextChanged: value => (
      dispatch({
        type: 'COMPLETED_COURSE_SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
    pageChanged: currentPage => (
      dispatch({
        type: 'COMPLETED_REPORT_PAGE_CHANGED_LOGIC',
        payload: currentPage,
      })
    ),
    dateRangeChanged: value => (
      dispatch({
        type: 'COMPLETED_COURSE_SEARCH_DATE_RANGE_CHANGED',
        payload: value,
      })
    ),
    rowKeysChanged: (rowKeys, selectedRows) => (
      dispatch({
        type: 'COMPLETED_COURSE_SELECT_CHANGED',
        payload: { rowKeys, selectedRows },
      })
    ),
  }
);

const CompletedCourseListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompletedCourseList);

export default CompletedCourseListWrapper;
