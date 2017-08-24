import React from 'react';
import PropTypes from 'prop-types';
import Card from 'antd/lib/card';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Badge from 'antd/lib/badge';

const HospitalListItem = ({ name }) => (
  <Card style={{ marginTop: 10, marginBottom: 10 }}>
    <Row>
      <Col span={4}>
        <Badge count={250} />
      </Col>
      <Col span={20}>
        <span style={{ fontSize: 13 }}>{name}</span>
      </Col>
    </Row>
  </Card>
);

HospitalListItem.propTypes = {
  name: PropTypes.string.isRequired,
};

export default HospitalListItem;
