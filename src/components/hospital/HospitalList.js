import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Menu from 'antd/lib/menu';

import HospitalListItem from './HospitalListItem';
import HospitalModalWindow from './HospitalModalWindow';

const HospitalList = () => (
  <div style={{ padding: 15, backgroundColor: '#eDeff5' }}>
    <Row>
      <Col span={24}>

        <Menu
          mode="horizontal"
          onClick={event => this.props.filterStudents(event.key)}
          style={{ backgroundColor: '#eDeff5' }}
        >
          <Menu.Item key="1">
            Hospitals
          </Menu.Item>
          <Menu.Item key="2">
            Clinics
          </Menu.Item>
        </Menu>
      </Col>
    </Row>
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
    <HospitalModalWindow />
  </div>
);

export default HospitalList;
