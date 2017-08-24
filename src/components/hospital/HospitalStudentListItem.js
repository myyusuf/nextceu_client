import React from 'react';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

const HospitalStudentListItem = ({ student }) => (
  <div>
    <Row>
      <Col span={12}>
        {`${student.oldSid} ${student.newSid}`}
      </Col>
      <Col span={12}>
        {student.name}
      </Col>
    </Row>
  </div>
);

HospitalStudentListItem.propTypes = {
  student: PropTypes.shape({
    oldSid: PropTypes.string.isRequired,
    newSid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default HospitalStudentListItem;
