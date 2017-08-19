import React, { Component } from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import StudentListWrapper from '../../containers/student/StudentListWrapper';

const Search = Input.Search;
// import PropTypes from 'prop-types';
// import Button from 'antd/lib/button';

class StudentListPage extends Component {

  render() {
    return (
      <Row>
        <Col span={24}>
          <Row>
            <Col span={20} className="Workspace-student-search-container">
              <Search
                placeholder="Name or SID"
                className="Workspace-student-search"
                value={this.props.studentFilter.searchText}
                onChange={e => this.props.filterStudents(e.target.value)}
                onSearch={value => console.log(value)}
              />
            </Col>
            <Col span={4}>
              <Button
                type="primary"
                shape="circle"
                icon="plus"
                style={{ marginTop: 20 }}
                onClick={() => this.props.openAddStudentWindow()}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <StudentListWrapper />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default StudentListPage;
