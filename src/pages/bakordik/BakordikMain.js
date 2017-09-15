import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import './BakordikMain.css';
import BakordikTree from '../../components/bakordik/BakordikTree';
import InitiateStudent from '../../components/bakordik/InitiateStudent';

const BakordikMain = ({ selectedMenuKey }) => {
  let componentToRender = <div style={{ padding: 20 }}>No Component</div>;
  switch (selectedMenuKey) {
    case '1-1':
      componentToRender = <InitiateStudent />;
      break;
    default:
      break;
  }
  return (
    <div>
      <Row>
        <Col span={4}>
          <BakordikTree />
        </Col>
        <Col span={20} style={{ backgroundColor: '#fff' }}>
          {componentToRender}
        </Col>
      </Row>
    </div>
  );
};

BakordikMain.propTypes = {
  selectedMenuKey: PropTypes.string.isRequired,
};

const mapStateToProps = state => (
  {
    selectedMenuKey: state.bakordikReducers.selectedMenuKey,
  }
);

const BakordikMainWrapper = connect(
  mapStateToProps,
  null,
)(BakordikMain);

export default BakordikMainWrapper;
