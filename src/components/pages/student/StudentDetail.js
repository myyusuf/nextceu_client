import React from 'react';
import PropTypes from 'prop-types';
import Tag from 'antd/lib/tag';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Progress from 'antd/lib/progress';
import './StudentDetail.css';

const StudentDetail = ({ student }) => (
  <div className="StudentDetail-container">
    <div>
      <span className="StudentDetail-name">{ student.name }</span>
      <span style={{ marginLeft: 20 }}><Tag>Level 1</Tag></span>
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
      <Progress type="circle" percent={75} strokeWidth={8} style={{ marginTop: 40, marginLeft: 20 }} />
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