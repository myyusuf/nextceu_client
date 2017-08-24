import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import HospitalForm from './HospitalForm';

const HospitalWindow = ({
  onOk,
  confirmLoading,
  code,
  name,
  hospitalFormChanged,
}) => (
  <div>
    <Row>
      <Col>
        <HospitalForm code={code} name={name} hospitalFormChanged={hospitalFormChanged} />
      </Col>
    </Row>
    <Row>
      <Col>
        <Button type="primary" loading={confirmLoading} onClick={onOk}>
          Loading
        </Button>
      </Col>
    </Row>
  </div>
);

HospitalWindow.propTypes = {
  onOk: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  hospitalFormChanged: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.hospitalReducers.hospitalWindow.visible,
    confirmLoading: state.hospitalReducers.hospitalWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onOk: () => {
      dispatch({
        type: 'SAVE_HOSPITAL_FORM',
      });
    },
  }
);

const HospitalWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HospitalWindow);

export default HospitalWindowWrapper;
