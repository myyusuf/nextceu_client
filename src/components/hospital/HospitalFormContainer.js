import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import HospitalFormWrapper from '../../containers/hospital/HospitalFormWrapper';

const HospitalFormContainer = ({
  onOk,
  confirmLoading,
}) => (
  <div style={{ paddingLeft: 20, paddingRight: 20 }}>
    <Row>
      <Col>
        <HospitalFormWrapper />
      </Col>
    </Row>
    <Row>
      <Col>
        <Button type="primary" loading={confirmLoading} onClick={onOk}>
          Save
        </Button>
      </Col>
    </Row>
  </div>
);

HospitalFormContainer.propTypes = {
  onOk: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    confirmLoading: state.hospitalReducers.hospitalFormContainer.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onOk: () => {
      dispatch({
        type: 'SAVE_HOSPITAL_LOGIC',
      });
    },
  }
);

const HospitalFormContainerWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HospitalFormContainer);

export default HospitalFormContainerWrapper;
