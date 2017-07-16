import React from 'react';
import axios from 'axios';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Tabs, Tab, SplitButton, MenuItem, Row, Col, ListGroup, Button } from 'react-bootstrap';
import CourseAddByLevelWindow from './CourseAddByLevelWindow';
import CourseAddByDepartmentWindow from './CourseAddByDepartmentWindow';
import CourseChartWindow from './CourseChartWindow';
import Constant from '../../Constant';

const STUDENTS_URL = `${Constant.serverUrl}/api/students`;

class CourseList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      student: props.student,
      showCourseAddByLevelWindow: false,
      showCourseAddByDepartmentWindow: false,
      showChart: false,
      courses: [],
      chartData: [],
    };

    this.addCourseButtonSelect = this.addCourseButtonSelect.bind(this);
    this.onAddCourseSuccess = this.onAddCourseSuccess.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.showChart = this.showChart.bind(this);
  }

  componentDidMount() {
    this.getCourses();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      student: nextProps.student,
    }, () => {
      this.getCourses();
    });
  }

  getCourses() {
    axios.get(`${STUDENTS_URL}/${this.state.student.id}/courses`)
    .then((response) => {
      const courses = response.data;
      const chartData = this.parseChartData(courses);
      this.setState({
        courses,
        chartData,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  parseChartData(courses) {
    const result = [];
    let childId = 100000000;
    for (let i = 0; i < courses.length; i += 1) {
      const course = courses[i];
      const mainSchedule = {
        id: course.id,
        text: course.title,
        color: course.Department.color,
        start_date: moment(course.planStartDate).format('DD-MM-YYYY'),
        end_date: moment(course.planEndDate).format('DD-MM-YYYY'),
      };

      const hospitalSchedule1 = {
        id: course.id + childId,
        parent: course.id,
        text: 'RS 1',
        color: '#D6DBDF',
        start_date: moment(course.planStartDate1).format('DD-MM-YYYY'),
        end_date: moment(course.planEndDate1).format('DD-MM-YYYY'),
      };

      childId += 1;

      const clinic = {
        id: course.id + childId,
        parent: course.id,
        text: 'Puskesmas',
        color: '#D6DBDF',
        start_date: moment(course.planStartDate2).format('DD-MM-YYYY'),
        end_date: moment(course.planEndDate2).format('DD-MM-YYYY'),
      };

      childId += 1;

      const hospitalSchedule2 = {
        id: course.id + childId,
        parent: course.id,
        text: 'RS 2',
        color: '#D6DBDF',
        start_date: moment(course.planStartDate3).format('DD-MM-YYYY'),
        end_date: moment(course.planEndDate3).format('DD-MM-YYYY'),
      };

      result.push(mainSchedule);
      result.push(hospitalSchedule1);
      result.push(clinic);
      result.push(hospitalSchedule2);
    }

    return result;
  }

  addCourseButtonSelect(eventKey, event) {
    if (eventKey === 'LEVEL') {
      this.setState({
        showCourseAddByLevelWindow: true,
      });
    } else if (eventKey === 'DEPARTMENT') {
      this.setState({
        showCourseAddByDepartmentWindow: true,
      });
    }
  }

  onAddCourseSuccess() {
    this.setState({
      showCourseAddByLevelWindow: false,
      showCourseAddByDepartmentWindow: false,
      showChart: false,
    }, () => {
      this.getCourses();
    });
  }

  confirmDelete(course) {
    const result = confirm(`Anda akan menghapus bagian : ${course.title}?`);
    if (result) {
      axios.delete(`${STUDENTS_URL}/${this.state.student.id}/courses/${course.id}`)
      .then((response) => {
        console.log(response);
        this.getCourses();
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  showChart(level) {
    if (level === 1) {
      this.setState({
        showChart: true,
      });
    } else if (level === 2) {
      this.setState({
        showChart: true,
      });
    }
  }

  render() {
    const level1Courses = this.state.courses;
    const level1CoursesEl = [];
    for (let i = 0; i < level1Courses.length; i += 1) {
      const course = level1Courses[i];

      level1CoursesEl.push(
        <div className="panel panel-default" key={course.id}>
            <div className="panel-heading">
                <div className="panel-title">
                  <div style={{ display: 'flex' }}>
                    <div style={{ width: 25, height: 25, border: '1px solid black', borderRadius: '50%', backgroundColor: course.Department.color }} />
                    <div style={{ marginLeft: 10 }}><a href={`#/students_view/${this.state.student.id}/course_details/${course.id}`}>{course.title}</a></div>
                  </div>
                </div>
            </div>
            <div className="panel-body">
              <div>
                <strong>Bagian : </strong>{course.Department.name}
              </div>
              <div className="text-right">
                <Button bsStyle="danger" bsSize="small" onClick={() => this.confirmDelete(course)}>
                  <i className="fa fa-remove" />
                </Button>
              </div>
            </div>
        </div>
      );
    }

    return (
      <Tabs
        style={{ marginLeft: 20, marginRight: 20, marginTop: 5 }}
        bsStyle="pills"
        defaultActiveKey={1}
        id="uncontrolled-tab-example"
      >
        <Tab eventKey={1} title="TINGKAT 1" style={{ marginTop: -10 }}>
          <Row>
            <Col md={6} mdOffset={6}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="text-right">
                <button style={{ marginRight: 10 }}
                  type="button"
                  className="btn btn-labeled btn-default ripple"
                  onClick={() => { this.showChart(1); }}
                >
                  Chart
                  <span className="btn-label btn-label-right">
                    <i className="ion-stats-bars" />
                  </span>
                </button>
                <SplitButton bsStyle="success" title="+ Bagian" onSelect={this.addCourseButtonSelect}>
                  <MenuItem eventKey="LEVEL">Tingkat</MenuItem>
                  <MenuItem eventKey="DEPARTMENT">Bagian</MenuItem>
                </SplitButton>
              </div>

            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <ListGroup style={{ marginTop: 20 }}>
                {level1CoursesEl}
              </ListGroup>

            </Col>
          </Row>

          <CourseAddByLevelWindow
            student={this.state.student}
            showModal={this.state.showCourseAddByLevelWindow}
            onSaveSuccess={this.onAddCourseSuccess}
          />

          <CourseAddByDepartmentWindow
            student={this.state.student}
            showModal={this.state.showCourseAddByDepartmentWindow}
            onSaveSuccess={this.onAddCourseSuccess}
          />

          <CourseChartWindow
            chartData={this.state.chartData}
            showModal={this.state.showChart}
            onClose={this.onAddCourseSuccess}
          />
        </Tab>
        <Tab eventKey={2} title="TINGKAT 2">Tab 2 content</Tab>
      </Tabs>
    );
  }
}

CourseList.propTypes = {
};

export default CourseList;
