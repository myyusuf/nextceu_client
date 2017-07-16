import React from 'react';
import axios from 'axios';
import { Row, Col, Panel, Button, ListGroup, ListGroupItem, Badge, ProgressBar, Grid } from 'react-bootstrap';
import StudentAddWindow from './StudentAddWindow';
import LevelSelect from '../level/LevelSelect';
import Constant from '../Constant';

const STUDENTS_URL = `${Constant.serverUrl}/api/students`;

class StudentPage extends React.Component {
// const StudentPage = () => {

  constructor(props) {
    super(props);
    this.state = {
      students: [],
      searchText: '',
      level: '',
      showStudentAddWindow: false,
    };

    this.showStudentAddWindow = this.showStudentAddWindow.bind(this);
    this.onAddStudentSuccess = this.onAddStudentSuccess.bind(this);
    this.viewStudent = this.viewStudent.bind(this);

    this.getStudents = this.getStudents.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    this.getStudents();
  }

  getStudents() {
    axios.get(STUDENTS_URL, {
      params: {
        searchText: this.state.searchText,
        level: this.state.level,
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
    });
  }

  viewStudent(studentId) {
    // window.location.href = `#/students_details/${student.id}/profile`;
    window.location.href = `#/students_view/${studentId}/profile`;
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
    });
  }

  render() {
    const studentThumbnails = [];
    const students = this.state.students;

    for (let i = 0; i < students.length; i += 1) {
      const student = students[i];
      let studentLevel = '';
      switch (student.level) {
        case 1:
          studentLevel = 'Tingkat 1';
          break;
        case 2:
          studentLevel = 'Tingkat 2';
          break;
        default:
          studentLevel = '0';
          break;
      }
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
                  <Col lg={4} md={8}><a href=""><img src="images/user/02.jpg" alt="Contact" className="fw img-responsive" /></a></Col>
              </Row>
              <h5>{student.name}</h5>
              <p className="mt"><em className="ion-android-list mr-sm"></em><span>{student.oldSid} {student.newSid}</span></p>
              <p className="mt">Proin est sapien, convallis non hendrerit nec</p>
            </div>
            <div className="card-footer text-center">
              <button type="button" className="btn btn-default btn-xs"><em className="ion-email icon-lg icon-fw"></em></button>
              <button type="button" className="btn btn-default btn-xs"><em className="ion-social-facebook icon-lg icon-fw"></em></button>
              <button type="button" className="btn btn-default btn-xs"><em className="ion-social-twitter icon-lg icon-fw"></em></button>
              <button type="button" className="btn btn-default btn-xs"><em className="ion-social-linkedin icon-lg icon-fw"></em></button>
              <button type="button" className="btn btn-default btn-xs"><em className="ion-social-skype icon-lg icon-fw"></em></button>
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
                    style={{ marginLeft: 10, marginTop: 20, marginBottom: 10 }}
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
                <Col sm={12}>
                  <div style={{ paddingLeft: 10, paddingRight: 10, marginBottom: 0, marginTop: 20 }}>
                    <LevelSelect
                      name="level"
                      onChange={this.handleSelectChange}
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col sm={12}>
                  <div className="input-group" style={{ padding: 10, marginBottom: 20 }}>
                    <input type="text" onChange={this.handleInputChange} className="form-control" placeholder="Stambuk atau Nama"/><span className="input-group-btn">
                    <button type="button" className="btn btn-default" onClick={this.getStudents}>Search</button></span>
                  </div>
                </Col>
              </Row>

              <div id="markers-list" className="list-group">
                  <a data-panto-marker="0" className="list-group-item">
                      <em className="pull-right ion-ios-arrow-forward"></em>
                      Aktif
                      <span className="pull-right nav-label" style={{ marginRight: 20 }}>
                        <span className="badge bg-success"></span>
                      </span>
                  </a>
                  <a data-panto-marker="1" className="list-group-item">
                      <em className="pull-right ion-ios-arrow-forward"></em>
                      Ujian UKMPPD
                      <span className="pull-right nav-label" style={{ marginRight: 20 }}>
                        <span className="badge bg-primary"></span>
                      </span>
                  </a>
                  <a data-panto-marker="2" className="list-group-item">
                      <em className="pull-right ion-ios-arrow-forward">
                      </em>Bermasalah
                      <span className="pull-right nav-label" style={{ marginRight: 20 }}>
                        <span className="badge bg-danger"></span>
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

export default StudentPage;
