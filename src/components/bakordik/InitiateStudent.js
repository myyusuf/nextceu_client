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
import Tag from 'antd/lib/tag';

import CourseWindow from '../../components/student/course/CourseWindow';
import * as actions from '../../actions/ActionType';

const Column = Table.Column;
const RangePicker = DatePicker.RangePicker;

class InitiateStudent extends Component {
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
      showDetails,
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
              placeholder="SID or Name Init"
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
              <Column
                title="Title"
                dataIndex="title"
                key="title"
              />
              <Column
                title="Department"
                dataIndex="Department.name"
                render={(text, record) => (
                  <Tag className="CourseListItem-tag" color={record.Department.color} onClick={() => showDetails(record)}>
                    {text}
                  </Tag>
                )}
              />
            </Table>
          </Col>
        </Row>
        <CourseWindow />
      </div>
    );
  }
}

InitiateStudent.propTypes = {
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
  showDetails: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    courses: state.bakordikReducers.initiateStudents.rows,
    count: state.bakordikReducers.initiateStudents.count,
    searchText: state.bakordikReducers.initiateStudentSearch.searchText,
    pageSize: state.bakordikReducers.initiateStudentSearch.pageSize,
    currentPage: state.bakordikReducers.initiateStudentSearch.currentPage,
    loading: state.bakordikReducers.initiateStudentSearch.loading,
    dateRange: state.bakordikReducers.initiateStudentSearch.dateRange,
    selectedRowKeys: state.bakordikReducers.initiateStudentSelection.rowKeys,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchCourses: () => {
      dispatch({
        type: actions.bakordik.initiateStudent.fetchCourses,
      });
    },
    searchTextChanged: value => (
      dispatch({
        type: actions.bakordik.initiateStudent.list.search.textChanged,
        payload: value,
      })
    ),
    pageChanged: currentPage => (
      dispatch({
        type: actions.bakordik.initiateStudent.list.search.pageChange,
        payload: currentPage,
      })
    ),
    dateRangeChanged: value => (
      dispatch({
        type: actions.bakordik.initiateStudent.list.search.dateRangeChanged,
        payload: value,
      })
    ),
    rowKeysChanged: (rowKeys, selectedRows) => (
      dispatch({
        type: actions.bakordik.initiateStudent.list.selection.selectChanged,
        payload: { rowKeys, selectedRows },
      })
    ),
    showDetails: (course) => {
      dispatch({
        type: 'LOAD_COURSE_TO_FORM_LOGIC',
        payload: course,
      });

      dispatch({
        type: 'FETCH_SCORES_LOGIC',
      });

      dispatch({
        type: 'FETCH_COURSE_SEMINARS_LOGIC',
      });

      dispatch({
        type: 'FETCH_COURSE_PROBLEMS_LOGIC',
      });

      dispatch({
        type: 'FETCH_PORTOFOLIOS_LOGIC',
      });

      dispatch({
        type: 'FETCH_DOCENTS_BY_HD_LOGIC',
      });
      dispatch({
        type: 'FETCH_DOCENTS_BY_CD_LOGIC',
      });
    },
  }
);

const InitiateCourseListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InitiateStudent);

export default InitiateCourseListWrapper;
