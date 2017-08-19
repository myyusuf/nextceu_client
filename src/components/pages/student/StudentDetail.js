import React from 'react';
import PropTypes from 'prop-types';
import Tag from 'antd/lib/tag';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import './StudentDetail.css';

const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
const COLORS = ['#5093E1', '#50C14E', '#F65177', '#9DA5BE'];

const RADIAN = Math.PI / 180;

const StudentDetail = ({ student, deleteStudent }) => (
  <div className="StudentDetail-container">
    <Row>
      <Col span={24}>
        <span className="StudentDetail-name">{ student.name }</span>
        <span style={{ marginLeft: 20 }}><Tag>Level 1</Tag></span>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <div style={{ fontWeight: 'bold', fontSize: 15 }}>
          <span>{ student.newSid } { student.oldSid }</span>
        </div>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <div className="StudentDetail-contact">
          <span>{ student.email }</span>
          <span>{ student.phone }</span>
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
          <span style={{ fontSize: 30, fontWeight: 'bold', color: 'gray' }}>7</span><br />
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
          >
          	{
            	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
        </PieChart>
      </Col>
      <Col span={12}>
        <div style={{ marginTop: 80 }}><Tag color="#5093E1">3</Tag> Completed </div>
        <div style={{ marginTop: 5 }}><Tag color="#50C14E">2</Tag> Problems </div>
        <div style={{ marginTop: 5 }}><Tag color="#F65177">1</Tag> Pendings </div>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <div className="StudentDetail-contact">
          <span style={{ fontSize: 11, fontWeight: 'bold', color: 'gray' }}>OTHER RESOURCES</span>
        </div>
      </Col>
    </Row>
    <Row style={{ marginTop: 10 }}>
      <Col span={24}>
        <Button type="">
          UKMPPD Score
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
        <Button type="danger" onClick={() => deleteStudent(student)}>
          Delete Student
        </Button>
      </Col>
    </Row>
  </div>
);

StudentDetail.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  deleteStudent: PropTypes.func.isRequired,
};

export default StudentDetail;
