import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import StudentList from '../../components/student/StudentList';
import './StudentListPage.css';

const Search = Input.Search;

const StudentListPage = ({
  fetchStudents,
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
    </Col>
  </Row>
);

StudentListPage.propTypes = {
  fetchStudents: PropTypes.func.isRequired,
  openAddWindow: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  searchTextChanged: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    searchText: state.studentReducers.studentSearch.searchText,
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
  }
);

const StudentListPageWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentListPage);

export default StudentListPageWrapper;
