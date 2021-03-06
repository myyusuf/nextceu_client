import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import notification from 'antd/lib/notification';
import Button from 'antd/lib/button';
import Upload from 'antd/lib/upload';
import Constant from '../../Constant';
import * as actions from '../../actions/ActionType';
import UploadResultWindow from './UploadResultWindow';

const SCORE_UPLOAD_URL = `${Constant.serverUrl}/api/scoreupload`;

const Column = Table.Column;

const uploadProps = {
  name: 'scoreFile',
  action: SCORE_UPLOAD_URL,
  headers: {
    authorization: 'authorization-text',
  },
};

const uploads = [
  {
    id: 1,
    name: 'Pre Test',
    url: 'pretest',
  },
  {
    id: 2,
    name: 'Post Test',
    url: 'posttest',
  },
];

const UploadList = ({ showUploadResult }) => {
  uploadProps.onChange = (info) => {
    if (info.file.status !== 'uploading') {
      // console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      console.log(info.file.response);
      showUploadResult(info.file.response);
      notification.success({
        message: 'Upload file success',
        description: `${info.file.name} file uploaded successfully.`,
      });
    } else if (info.file.status === 'error') {
      notification.error({
        message: 'Upload file error',
        description: `${info.file.name} file upload failed.`,
      });
    }
  };

  return (
    <div style={{ paddingLeft: 10, paddingRight: 10, marginTop: -20 }}>
      <Row>
        <Col span={24}>
          <Table dataSource={uploads} style={{ marginTop: 20 }} size="middle" rowKey="id">
            <Column
              title="Name"
              dataIndex="name"
              key="name"
            />
            <Column
              title="Action"
              key="action"
              render={(text, record) => {
                const tempUploadProps = { ...uploadProps, action: `${SCORE_UPLOAD_URL}/${record.url}` };
                return (
                  <span>
                    <Upload {...tempUploadProps}>
                      <Button
                        type="primary"
                        shape="circle"
                        icon="upload"
                      />
                    </Upload>
                  </span>
                );
              }}
            />
          </Table>
        </Col>
      </Row>
      <UploadResultWindow />
    </div>
  );
};

UploadList.propTypes = {
  showUploadResult: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
  {
    showUploadResult: (uploadResult) => {
      dispatch({
        type: actions.upload.uploadResult.window.open,
      });
      dispatch({
        type: actions.upload.uploadResult.clearResult,
      });
      dispatch({
        type: actions.upload.uploadResult.loadResult,
        payload: uploadResult,
      });
    },
  }
);

const UploadListWrapper = connect(
  null,
  mapDispatchToProps,
)(UploadList);

export default UploadListWrapper;
