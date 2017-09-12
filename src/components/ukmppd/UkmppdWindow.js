import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import Tabs from 'antd/lib/tabs';
import Button from 'antd/lib/button';
import KompreList from './KompreList';

const TabPane = Tabs.TabPane;

const UkmppdWindow = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}) => (
  <Modal
    title="UKMPPD"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    cancelText="Cancel"
    onCancel={onCancel}
    width={800}
    wrapClassName="vertical-center-modal"
    footer={[
      <Button key="Close" size="large" onClick={onCancel}>Cancel</Button>,
      <Button key="save" type="primary" size="large" loading={confirmLoading} onClick={onOk}>
        Save
      </Button>,
    ]}
  >
    <Tabs defaultActiveKey="1" style={{ marginTop: -10, height: 500 }}>
      <TabPane tab="Prerequesite" key="1">
        
      </TabPane>
      <TabPane tab="Score" key="2">
        <KompreList />
      </TabPane>
    </Tabs>
  </Modal>
);

UkmppdWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.ukmppdReducers.ukmppdWindow.visible,
    confirmLoading: state.ukmppdReducers.ukmppdWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: 'CANCEL_EDIT_UKMPPD_LOGIC',
      });
    },
    onOk: () => {
      dispatch({
        type: 'SAVE_UKMPPD_LOGIC',
      });
    },
  }
);

const UkmppdWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UkmppdWindow);

export default UkmppdWindowWrapper;
