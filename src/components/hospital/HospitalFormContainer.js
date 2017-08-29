import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import HospitalForm from './HospitalForm';

const HospitalFormContainer = ({
  onOk,
  confirmLoading,
  hospitalForm,
  hospitalFormChanged,
}) => (
  <div style={{ paddingLeft: 20, paddingRight: 20 }}>
    <Row>
      <Col>
        <HospitalForm
          code={hospitalForm.code}
          name={hospitalForm.name}
          hospitalFormChanged={hospitalFormChanged}
        />
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
  hospitalForm: PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  hospitalFormChanged: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.hospitalReducers.hospitalWindow.visible,
    confirmLoading: state.hospitalReducers.hospitalWindow.confirmLoading,
    hospitalForm: state.hospitalReducers.hospitalForm,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onOk: () => {
      dispatch({
        type: 'SAVE_HOSPITAL_FORM_LOGIC',
      });
    },
    hospitalFormChanged: (value) => {
      dispatch({
        type: 'HOSPITAL_FORM_CHANGED',
        payload: value,
      });
    },
  }
);

const HospitalFormContainerWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HospitalFormContainer);

export default HospitalFormContainerWrapper;
