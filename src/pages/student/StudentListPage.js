import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Pagination from 'antd/lib/pagination';
import StudentList from '../../components/student/StudentList';
import './StudentListPage.css';

const Search = Input.Search;

const StudentListPage = ({
  fetchStudents,
  count,
  pageSize,
  currentPage,
  openAddWindow,
  searchText,
  searchTextChanged,
}) => (
  <Row>
    <Col span={24}>
      <Row>
        <Col span={20} className="student-search-container">
          <Search
            placeholder="Name or SID"
            className="student-search"
            value={searchText}
            onChange={e => searchTextChanged(e.target.value)}
            onSearch={() => fetchStudents()}
          />
        </Col>
        <Col span={4}>
          <Button
            type="primary"
            shape="circle"
            icon="plus"
            style={{ marginTop: 20 }}
            onClick={() => openAddWindow()}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <StudentList />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', marginTop: 20 }}>
            <Pagination current={currentPage} total={count} pageSize={pageSize} />
          </div>
        </Col>
      </Row>
    </Col>
  </Row>
);

StudentListPage.propTypes = {
  fetchStudents: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  openAddWindow: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  searchTextChanged: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    searchText: state.studentReducers.studentSearch.searchText,
    count: state.studentReducers.students.count,
    pageSize: state.studentReducers.studentSearch.pageSize,
    currentPage: state.studentReducers.studentSearch.currentPage,
  }
);

const mapDispatchToProps = dispatch => (
  {
    openAddWindow: () => {
      dispatch({
        type: 'EDIT_STUDENT_LOGIC',
      });
    },
    searchTextChanged: value => (
      dispatch({
        type: 'STUDENT_SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
    fetchStudents: () => (
      dispatch({
        type: 'FETCH_STUDENTS_LOGIC',
      })
    ),
  }
);

const StudentListPageWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentListPage);

export default StudentListPageWrapper;
