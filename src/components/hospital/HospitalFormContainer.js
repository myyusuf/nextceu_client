import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import HospitalFormWrapper from '../../containers/hospital/HospitalFormWrapper';

const confirm = Modal.confirm;

const HospitalFormContainer = ({
  onOk,
  confirmLoading,
  hospitalId,
  hospitalName,
  confirmDelete,
}) => (
  <div style={{ paddingLeft: 20, paddingRight: 20 }}>
    <Row>
      <Col>
        <HospitalFormWrapper />
      </Col>
    </Row>
    <Row>
      <Col>
        <Button
          type="primary"
          loading={confirmLoading}
          onClick={onOk}
          disabled={hospitalId === undefined}
          style={{ marginRight: 10 }}
        >
          Save
        </Button>
        <Button type="danger" loading={confirmLoading} onClick={() => confirmDelete(hospitalId, hospitalName)} disabled={hospitalId === undefined}>
          Delete
        </Button>
      </Col>
    </Row>
  </div>
);

HospitalFormContainer.propTypes = {
  onOk: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
  hospitalId: PropTypes.number.isRequired,
  hospitalName: PropTypes.string.isRequired,
  confirmDelete: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    confirmLoading: state.hospitalReducers.hospitalFormContainer.confirmLoading,
    hospitalId: state.hospitalReducers.hospitalForm.id.value,
    hospitalName: state.hospitalReducers.hospitalForm.name.value,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onOk: () => {
      dispatch({
        type: 'SAVE_HOSPITAL_LOGIC',
      });
    },
    confirmDelete: (hospitalId, hospitalName) => (
      confirm({
        title: `Do you Want to delete hospital: ${hospitalName}`,
        content: 'This action cannot be undone',
        onOk() {
          dispatch({
            type: 'DELETE_HOSPITAL_LOGIC',
            payload: { id: hospitalId },
          });
        },
        onCancel() {
          console.log('Cancel');
        },
      })
    ),
  }
);

const HospitalFormContainerWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HospitalFormContainer);

export default HospitalFormContainerWrapper;
