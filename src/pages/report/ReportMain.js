import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import './ReportMain.css';
import ReportTree from '../../components/report/ReportTree';
import CostUnitReport from '../../components/report/CostUnitReport';

const ReportMain = ({ selectedMenuKey }) => {
  let componentToRender = <div style={{ padding: 20 }}>No Component</div>;
  switch (selectedMenuKey) {
    case '1-1':
      componentToRender = <CostUnitReport />;
      break;
    default:
      break;
  }
  return (
    <div>
      <Row>
        <Col span={4}>
          <ReportTree />
        </Col>
        <Col span={20} style={{ backgroundColor: '#fff' }}>
          {componentToRender}
        </Col>
      </Row>
    </div>
  );
};

ReportMain.propTypes = {
  selectedMenuKey: PropTypes.string.isRequired,
};

const mapStateToProps = state => (
  {
    selectedMenuKey: state.reportReducers.reports.selectedMenuKey,
  }
);

const mapDispatchToProps = dispatch => (
  {
    openAddWindow: () => (
      dispatch({
        type: 'ADD_HOSPITAL_LOGIC',
      })
    ),
  }
);

const ReportMainWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportMain);

export default ReportMainWrapper;
