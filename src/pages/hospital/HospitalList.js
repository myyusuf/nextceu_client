import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import HospitalListItem from './HospitalListItem';

const HospitalList = () => (
  <div style={{ padding: 15, backgroundColor: '#eDeff5' }}>
    <Row gutter={20}>
      <Col span={8}>
        <HospitalListItem name="Hello" />
      </Col>
      <Col span={8}>
        <HospitalListItem name="Hello" />
      </Col>
      <Col span={8}>
        <HospitalListItem name="Hello" />
      </Col>

      <Col span={8}>
        <HospitalListItem name="Hello" />
      </Col>
      <Col span={8}>
        <HospitalListItem name="Hello" />
      </Col>
      <Col span={8}>
        <HospitalListItem name="Hello" />
      </Col>
    </Row>
  </div>
);

export default HospitalList;
