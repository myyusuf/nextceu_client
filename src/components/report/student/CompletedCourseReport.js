import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import DatePicker from 'antd/lib/date-picker';

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
      openAddWindow,
      openEditWindow,
      searchText,
      searchTextChanged,
      pageChanged,
      loading,
      dateRange,
      dateRangeChanged,
    } = this.props;
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
              placeholder="Name"
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
            >
              <Column
                title="Title"
                dataIndex="title"
                key="title"
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
                  </span>
                )}
              />
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

CompletedCourseList.propTypes = {
  fetchCompletedCourses: PropTypes.func.isRequired,
  openAddWindow: PropTypes.func.isRequired,
  openEditWindow: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  searchTextChanged: PropTypes.func.isRequired,
  pageChanged: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  completedCourses: PropTypes.arrayOf(PropTypes.shape({
    completedCoursename: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  dateRangeChanged: PropTypes.func.isRequired,
  dateRange: PropTypes.arrayOf(PropTypes.shape).isRequired,
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
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchCompletedCourses: () => {
      dispatch({
        type: 'FETCH_COMPLETED_COURSES_LOGIC',
      });

      dispatch({
        type: 'FETCH_ALL_ROLES_LOGIC',
      });
    },
    openAddWindow: () => (
      dispatch({
        type: 'EDIT_COMPLETED_REPORT_LOGIC',
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
  }
);

const CompletedCourseListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CompletedCourseList);

export default CompletedCourseListWrapper;
