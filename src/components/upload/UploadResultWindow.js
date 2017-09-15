import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import Tabs from 'antd/lib/tabs';
import * as actions from '../../actions/ActionType';

const Column = Table.Column;
const TabPane = Tabs.TabPane;

const UploadResultWindow = ({
  visible,
  onCancel,
  uploadResult,
}) => (
  <Modal
    title="Upload Result"
    visible={visible}
    okText="Save"
    onCancel={onCancel}
    footer={[
      <Button size="large" onClick={onCancel}>Close</Button>,
    ]}
  >
    <Tabs defaultActiveKey="1" style={{ minHeight: 335 }}>
      <TabPane tab="Found SID" key="1">
        <Table
          dataSource={uploadResult.filter(item => (item.found))}
          style={{ marginTop: 10 }}
          rowKey="newSid"
          size="middle"
        >
          <Column
            title="New SID"
            dataIndex="newSid"
            key="newSid"
          />
        </Table>
      </TabPane>
      <TabPane tab="Not Found SID" key="2">
        <Table
          dataSource={uploadResult.filter(item => (!item.found))}
          style={{ marginTop: 10 }}
          rowKey="newSid"
          size="middle"
        >
          <Column
            title="New SID"
            dataIndex="newSid"
            key="newSid"
          />
        </Table>
      </TabPane>
    </Tabs>
  </Modal>
);

UploadResultWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  uploadResult: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

const mapStateToProps = state => (
  {
    visible: state.uploadReducers.uploadResultWindow.visible,
    uploadResult: state.uploadReducers.uploadResultWindow.uploadResult,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onCancel: () => {
      dispatch({
        type: actions.upload.uploadResult.window.close,
      });
    },
  }
);

const UploadResultWindowWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UploadResultWindow);

export default UploadResultWindowWrapper;
