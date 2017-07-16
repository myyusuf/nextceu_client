import React from 'react';
import axios from 'axios';
import { Row, Col, Panel, Button, ListGroup, ListGroupItem, Badge, ProgressBar, Grid } from 'react-bootstrap';
import StudentAddWindow from './StudentAddWindow';
import LevelSelect from '../level/LevelSelect';
import Constant from '../Constant';

const STUDENTS_URL = `${Constant.serverUrl}/api/students`;
const STUDENTS_STATUS_URL = `${Constant.serverUrl}/api/students_status`;

class StudentList extends React.Component {
// const StudentList = () => {

  constructor(props) {
    super(props);
    this.state = {
      students: [],
      searchText: '',
      level: '',
      status: '',
      activeStatusCount: '',
      ukmppdStatusCount: '',
      problemStatusCount: '',
      showStudentAddWindow: false,
    };

    this.showStudentAddWindow = this.showStudentAddWindow.bind(this);
    this.onAddStudentSuccess = this.onAddStudentSuccess.bind(this);
    this.viewStudent = this.viewStudent.bind(this);

    this.getStudents = this.getStudents.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    this.getStudents();
    this.getStatusCount();
  }

  getStudents() {
    axios.get(STUDENTS_URL, {
      params: {
        searchText: this.state.searchText,
        level: this.state.level,
        status: this.state.status,
      },
    })
    .then((response) => {
      this.setState({
        students: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getStatusCount() {
    axios.get(STUDENTS_STATUS_URL)
    .then((response) => {
      const statuses = response.data;
      let activeStatusCount = 0;
      let ukmppdStatusCount = 0;
      let problemStatusCount = 0;

      for (let i = 0; i < statuses.length; i += 1) {
        const status = statuses[i];
        switch (status.status) {
          case 'ACTIVE':
            activeStatusCount = status.statusCount;
            break;
          case 'UKMMPD':
            ukmppdStatusCount = status.statusCount;
            break;
          case 'PROBLEM':
            problemStatusCount = status.statusCount;
            break;
          default:
            break;
        }
      }

      this.setState({
        activeStatusCount,
        ukmppdStatusCount,
        problemStatusCount,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      searchText: value,
    });
  }

  handleSelectChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      level: value,
    }, () => {
      this.getStudents();
    });
  }

  handleStatusChange(status) {
    this.setState({
      status,
    }, () => {
      this.getStudents();
    });
  }

  viewStudent(studentId, path = 'profile') {
    // window.location.href = `#/students_details/${student.id}/profile`;
    window.location.href = `#/students_view/${studentId}/${path}`;
  }

  showStudentAddWindow() {
    this.setState({
      showStudentAddWindow: true,
    });
  }

  onAddStudentSuccess() {
    this.setState({
      showStudentAddWindow: false,
    }, () => {
      this.getStudents();
      this.getStatusCount();
    });
  }

  render() {
    const studentThumbnails = [];
    const students = this.state.students;
    const now = 75;

    for (let i = 0; i < students.length; i += 1) {
      const student = students[i];

      studentThumbnails.push(
        <Col md={4} sm={6} key={student.id}>
          <div className="card">
            <div className="card-body">
              <div className="pull-right dropdown visible-lg visible-md">
                <button type="button" data-toggle="dropdown" className="btn btn-flat btn-flat-icon" onClick={() => this.viewStudent(student.id)}>
                  <em className="ion-android-more-vertical"></em>
                </button>
              </div>
              <Row>
                  <Col lg={4} md={8}><a href=""><img src="https://s3-ap-southeast-1.amazonaws.com/ceu-sg1-1/images/user.png" alt="Contact" className="fw img-responsive" /></a></Col>
              </Row>
              <h5>{student.name}</h5>
              <p className=""><span>{student.oldSid} {student.newSid}</span></p>
              <p className=""><span className="badge bg-info" style={{ padding: 10 }} onClick={() => this.viewStudent(student.id, 'course')}>Radiologi</span></p>
            </div>
            <div className="card-footer text-center">
              <ProgressBar now={now} bsStyle="" />
            </div>
          </div>
        </Col>
      );
    }
    return (
      <section>
        <div className="container-full">

          <div className="row fh bg-white">
            <div className="col-md-3 fh-md oa pr0">

              <Row>

                <Col sm={12} className="text-left">
                  <button
                    type="button"
                    className="btn btn-labeled btn-success ripple"
                    style={{ marginLeft: 15, marginTop: 15, marginBottom: 10 }}
                    onClick={this.showStudentAddWindow}
                  >
                    Mahasiswa
                    <span className="btn-label btn-label-right">
                      <i className="ion-plus-round" />
                    </span>
                  </button>
                </Col>
              </Row>

              <Row>
                <Col sm={9}>
                  <div style={{ paddingLeft: 15, paddingRight: 15, marginBottom: 10, marginTop: 15 }}>
                    <LevelSelect
                      name="level"
                      onChange={this.handleSelectChange}
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col sm={12}>
                  <div className="input-group" style={{ paddingLeft: 15, paddingRight: 15, marginBottom: 20 }}>
                    <input type="text" onChange={this.handleInputChange} className="form-control" placeholder="Stambuk atau Nama"/><span className="input-group-btn">
                    <button type="button" className="btn btn-default" onClick={this.getStudents}>Search</button></span>
                  </div>
                </Col>
              </Row>

              <div id="markers-list" className="list-group" style={{ paddingLeft: 15, paddingRight: 15 }}>
                  <a data-panto-marker="0" className={this.state.status === 'ACTIVE' ? 'list-group-item active' : 'list-group-item'} onClick={() => this.handleStatusChange('ACTIVE')}>
                      <em className="pull-right ion-ios-arrow-forward"></em>
                      Aktif
                      <span className="pull-right nav-label" style={{ marginRight: 20 }}>
                        <span className="badge">{this.state.activeStatusCount}</span>
                      </span>
                  </a>
                  <a data-panto-marker="1" className={this.state.status === 'UKMPPD' ? 'list-group-item active' : 'list-group-item'} onClick={() => this.handleStatusChange('UKMPPD')}>
                      <em className="pull-right ion-ios-arrow-forward"></em>
                      Ujian UKMPPD
                      <span className="pull-right nav-label" style={{ marginRight: 20 }}>
                        <span className="badge">{this.state.ukmppdStatusCount}</span>
                      </span>
                  </a>
                  <a data-panto-marker="2" className={this.state.status === 'PROBLEM' ? 'list-group-item active' : 'list-group-item'} onClick={() => this.handleStatusChange('PROBLEM')}>
                      <em className="pull-right ion-ios-arrow-forward">
                      </em>Bermasalah
                      <span className="pull-right nav-label" style={{ marginRight: 20 }}>
                        <span className="badge">{this.state.problemStatusCount}</span>
                      </span>
                  </a>
              </div>

            </div>


            <div className="col-md-9 fh-md oa bg-gray-lighter">
              <Grid fluid style={{ padding: 12, paddingLeft: 0 }}>
                <Row>
                  {studentThumbnails}
                </Row>
              </Grid>

            </div>

          </div>
        </div>

        <StudentAddWindow
          showModal={this.state.showStudentAddWindow}
          onSaveSuccess={this.onAddStudentSuccess}
        />
      </section>
    );
  }
}

export default StudentList;
