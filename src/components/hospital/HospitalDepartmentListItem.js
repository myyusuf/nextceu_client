import React from 'react';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

const HospitalDepartmentListItem = ({ hospitalDepartment }) => (
  <div style={{ padding: 5 }}>
    <Row>
      <Col span={12}>
        {hospitalDepartment.Department.name}
      </Col>
      <Col span={12}>
        {hospitalDepartment.quota}
      </Col>
    </Row>
  </div>
);

HospitalDepartmentListItem.propTypes = {
  hospitalDepartment: PropTypes.shape({
    Department: PropTypes.shape({
      id: PropTypes.number.isRequired,
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    quota: PropTypes.string.isRequired,
  }).isRequired,
};

export default HospitalDepartmentListItem;
