import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import Tabs from 'antd/lib/tabs';
import YudisiumChecklistForm from './YscForm';
import PortofolioCompletion from './PortofolioCompletion';

import * as actions from '../../actions/ActionType';

const TabPane = Tabs.TabPane;

const YudisiumWindow = ({
  visible,
  onOk,
  onCancel,
  confirmLoading,
}) => (
  <Modal
    title="Yudisium Prerequisite"
    visible={visible}
    okText="Save"
    onOk={onOk}
    confirmLoading={confirmLoading}
    onCancel={onCancel}
    width={580}
  >
    <Tabs defaultActiveKey="1" style={{ minHeight: 335 }}>
      <TabPane tab="Checklist" key="1">
        <YudisiumChecklistForm />
      </TabPane>
      <TabPane tab="Portofolios" key="2">
        <PortofolioCompletion />
      </TabPane>
    </Tabs>
  </Modal>
);

YudisiumWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.yudisiumReducers.yudisiumWindow.visible,
    confirmLoading: state.yudisiumReducers.yudisiumWindow.confirmLoading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: actions.yudisium.yudisiumWindow.close,
      });
    },
    onOk: () => {
      dispatch({
        type: actions.yudisium.yudisium.save,
      });
      dispatch({
        type: actions.yudisium.yudisiumWindow.close,
      });
    },
  }
);

const YudisiumWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(YudisiumWindow);

export default YudisiumWindowWrapper;
