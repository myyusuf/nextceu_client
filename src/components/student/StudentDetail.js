import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Tag from 'antd/lib/tag';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { PieChart, Pie, Cell } from 'recharts';
import Modal from 'antd/lib/modal';
import YudisiumWindow from '../yudisium/YudisiumWindow';
import UkmppdWindow from '../ukmppd/UkmppdWindow';
import * as actions from '../../actions/ActionType';
import './StudentDetail.css';

const confirm = Modal.confirm;
const COLORS = ['#5093E1', '#50C14E', '#F65177', '#9DA5BE', '#000'];

const StudentDetail = ({
  student,
  confirmDelete,
  editStudent,
  courses,
  openYudisiumWindow,
  openUkmppdWindow,
}) => {
  const onGoingCount = courses.filter(course => course.status === 1).length;
  const completedCount = courses.filter(course => course.status === 2).length;
  const scheduledCount = courses.filter(course => course.status === 0).length;
  const problemCount = courses.filter(course => course.status === 3).length;
  const pendingCount = courses.filter(course => course.status === 4).length;
  const data = [
    {
      name: 'On Going',
      value: onGoingCount,
    },
    {
      name: 'Completed',
      value: completedCount,
    },
    {
      name: 'Problem',
      value: problemCount,
    },
    {
      name: 'Scheduled',
      value: scheduledCount,
    },
    {
      name: 'Pending',
      value: pendingCount,
    },
  ];

  if (student.id) {
    let studentLevel = '';
    switch (student.level) {
      case 1:
      case 2:
        studentLevel = `Level ${student.level}`;
        break;
      case 3:
        studentLevel = 'MPPD Test';
        break;
      case 4:
        studentLevel = 'Graduate';
        break;
      default:
        studentLevel = '';
    }
    return (
      <div className="StudentDetail-container">
        <Row>
          <Col span={24}>
            <span className="StudentDetail-name" onClick={() => editStudent(student)}>{ student.name }</span>
            <span style={{ marginLeft: 20 }}><Tag>{studentLevel}</Tag></span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div style={{ fontWeight: 'bold', fontSize: 15 }}>
              <span>{ student.oldSid } - { student.newSid }</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className="StudentDetail-contact">
              <span>{ student.email }</span>
              <span>{ student.mobilePhone }</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Button type="primary" style={{ marginTop: 20, backgroundColor: '#50C14E', borderColor: '#50C14E' }}>
              Send SMS
              <Icon type="message" style={{ fontSize: 14 }} />
            </Button>
            <Button type="primary" style={{ marginTop: 20, marginLeft: 10, backgroundColor: '#50C14E', borderColor: '#50C14E' }}>
              Call
              <Icon type="mobile" style={{ fontSize: 14 }} />
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <div style={{ position: 'relative', top: 92, left: 56, textAlign: 'center', width: 100 }}>
              <span style={{ fontSize: 30, fontWeight: 'bold', color: 'gray' }}>
                {courses.length}
              </span><br />
              <span style={{ fontWeight: 'bold' }}>Courses</span>
            </div>
            <PieChart style={{ top: -20 }} width={200} height={170} onMouseEnter={this.onPieEnter}>
              <Pie
                data={data}
                cx={100}
                cy={80}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={0}
                label={false}
                dataKey="value"
              >
                {
                  data.map((entry, index) => (
                    <Cell
                      key={COLORS[index % COLORS.length]}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))
                }
              </Pie>
            </PieChart>
          </Col>
          <Col span={12}>
            <div style={{ marginTop: 60 }}><Tag color="#9DA5BE">{scheduledCount}</Tag> Scheduled </div>
            <div style={{ marginTop: 5 }}><Tag color="#5093E1">{onGoingCount}</Tag> On Going </div>
            <div style={{ marginTop: 5 }}><Tag color="#50C14E">{completedCount}</Tag> Completed </div>
            <div style={{ marginTop: 5 }}><Tag color="#F65177">{problemCount}</Tag> Problem </div>
            <div style={{ marginTop: 5 }}><Tag color="#000">{pendingCount}</Tag> Pending </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className="StudentDetail-contact">
              <span style={{ fontSize: 11, fontWeight: 'bold', color: 'gray' }}>PREREQUISITE</span>
            </div>
          </Col>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <Col span={24}>
            <Button type="" onClick={() => openYudisiumWindow()}>
              Yudisium 1
            </Button>
            <Button type="" onClick={() => openUkmppdWindow()} style={{ marginLeft: 10 }}>
              UKMPPD
            </Button>
            <Button type="" style={{ marginLeft: 10 }}>
              Problems
            </Button>
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>
          <Col span={24}>
            <span style={{ fontSize: 11, fontWeight: 'bold', color: 'gray' }}>ACTION</span>
          </Col>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <Col span={24}>
            <Button type="danger" onClick={() => confirmDelete(student)}>
              Delete Student
            </Button>
          </Col>
        </Row>

        <YudisiumWindow />
        <UkmppdWindow />
      </div>
    );
  }

  return (
    <div className="StudentDetail-container">
      <img
        src="https://s3-ap-southeast-1.amazonaws.com/admin.ceufkumi.id/static/images/empty_pages/Empty_student_detail1.png?v=1"
        style={{ width: 363 }}
      />
    </div>
  );
};

StudentDetail.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  confirmDelete: PropTypes.func.isRequired,
  editStudent: PropTypes.func.isRequired,
  openYudisiumWindow: PropTypes.func.isRequired,
  openUkmppdWindow: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    student: state.studentReducers.student,
    courses: state.studentReducers.courses,
  }
);

const mapDispatchToProps = dispatch => (
  {
    openYudisiumWindow: () => {
      dispatch({
        type: actions.yudisium.yscForm.clear,
      });
      dispatch({
        type: actions.yudisium.yudisium.fetchData,
      });
      dispatch({
        type: actions.yudisium.portofolioCompletion.fetchPortofolioCompletions,
      });
      dispatch({
        type: actions.yudisium.yudisiumWindow.open,
      });
    },
    openUkmppdWindow: () => {
      dispatch({
        type: 'EDIT_UKMPPD_LOGIC',
      });
      dispatch({
        type: 'FETCH_KOMPRES_LOGIC',
      });
    },
    editStudent: student => dispatch({
      type: 'LOAD_STUDENT_TO_FORM_LOGIC',
      payload: student,
    }),
    confirmDelete: student => (
      confirm({
        title: `Do you Want to delete student: ${student.name}`,
        content: 'This action cannot be undone',
        onOk() {
          dispatch({
            type: 'DELETE_STUDENT_LOGIC',
            payload: student,
          });
        },
        onCancel() {
          console.log('Cancel');
        },
      })
    ),
  }
);

const StudentDetailWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentDetail);

export default StudentDetailWrapper;
