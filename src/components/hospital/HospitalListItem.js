import React from 'react';
import PropTypes from 'prop-types';
import Card from 'antd/lib/card';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Badge from 'antd/lib/badge';
import './HospitalListItem.css';

const HospitalListItem = ({ hospital, selectHospital }) => {
  const departmentQuota = parseInt(hospital.departmentQuota, 10);
  const studentsInDepartmentCount = parseInt(hospital.studentsInDepartmentCount, 10);
  let badge = (
    <Badge
      count={hospital.studentsInDepartmentCount}
      overflowCount={1000}
      style={{ backgroundColor: '#87d068' }}
      showZero
    />
  );
  if (studentsInDepartmentCount > departmentQuota) {
    badge = (
      <Badge
        count={hospital.studentsInDepartmentCount}
        overflowCount={1000}
        showZero
      />
    );
  }

  return (
    <Card
      style={{ height: 100 }}
      onClick={() => selectHospital(hospital)}
      className={hospital.selected ? 'HospitalList-item-selected' : 'HospitalList-item'}
    >
      <Row gutter={10}>
        <Col span={3}>
          {badge}
        </Col>
        <Col span={3}>
          <Badge
            count={hospital.departmentQuota}
            overflowCount={1000}
            style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }}
            showZero
          />
        </Col>
        <Col span={18}>
          <div style={{ marginLeft: 5, fontSize: 13 }}>{hospital.name}</div>
        </Col>
      </Row>
    </Card>
  );
};


HospitalListItem.propTypes = {
  hospital: PropTypes.shape.isRequired,
  selectHospital: PropTypes.func.isRequired,
};

export default HospitalListItem;
