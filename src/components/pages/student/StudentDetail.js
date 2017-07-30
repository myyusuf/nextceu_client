import React from 'react';
import PropTypes from 'prop-types';
import Tag from 'antd/lib/tag';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Progress from 'antd/lib/progress';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import './StudentDetail.css';

const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;

const StudentDetail = ({ student }) => (
  <div className="StudentDetail-container">
    <div>
      <span className="StudentDetail-name">{ student.name }</span>
      <span style={{ marginLeft: 20 }}><Tag>Level 1</Tag></span>
    </div>
    <div style={{ fontWeight: 'bold', fontSize: 15 }}>
      <span>{ student.newSid } { student.oldSid }</span>
    </div>
    <div className="StudentDetail-contact">
      <span>{ student.email }</span>
      <span>{ student.phone }</span>
    </div>
    <div>
      <Button type="primary" style={{ marginTop: 20, backgroundColor: '#50C14E', borderColor: '#50C14E' }}>
        Send SMS
        <Icon type="message" style={{ fontSize: 14 }} />
      </Button>
      <Button type="primary" style={{ marginTop: 20, marginLeft: 10, backgroundColor: '#50C14E', borderColor: '#50C14E' }}>
        Call
        <Icon type="mobile" style={{ fontSize: 14 }} />
      </Button>
    </div>
    <div>
      <PieChart width={400} height={220} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          cx={120}
          cy={120}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={0}
        >
        	{
          	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
    </div>
    <div style={{ marginTop: 30 }}>
      <span style={{ fontSize: 11, fontWeight: 'bold', color: 'gray' }}>OTHER RESOURCES</span>
    </div>
    <div style={{ marginTop: 10 }}>
      <Button type="">
        UKMPPD Score
      </Button>
      <Button type="" style={{ marginLeft: 10 }}>
        Problems
      </Button>
    </div>
    <div style={{ marginTop: 20 }}>
      <span style={{ fontSize: 11, fontWeight: 'bold', color: 'gray' }}>ACTION</span>
    </div>
    <div style={{ marginTop: 10 }}>
      <Button type="danger">
        Delete Student
      </Button>
    </div>
  </div>
);

StudentDetail.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
};

export default StudentDetail;