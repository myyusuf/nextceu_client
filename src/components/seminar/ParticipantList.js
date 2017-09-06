import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Upload from 'antd/lib/upload';
import notification from 'antd/lib/notification';
import Constant from '../../Constant';

const Column = Table.Column;

const SEMINAR_UPLOAD_URL = `${Constant.serverUrl}/api/seminarupload`;

const uploadProps = {
  name: 'seminarFile',
  action: SEMINAR_UPLOAD_URL,
  headers: {
    authorization: 'authorization-text',
  },
};

class ParticipantList extends Component {
  componentWillMount() {
    // this.props.fetchParticipants();
  }

  render() {
    const {
      participants,
      count,
      pageSize,
      currentPage,
      fetchParticipants,
      searchText,
      searchTextChanged,
      pageChanged,
      loading,
      seminarId,
    } = this.props;

    uploadProps.action = `${SEMINAR_UPLOAD_URL}/${seminarId}`;
    const buttonDisabled = seminarId === undefined;
    uploadProps.onChange = (info) => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        fetchParticipants();

        notification.success({
          message: 'Upload file success',
          description: info.file.response,
        });
      } else if (info.file.status === 'error') {
        notification.error({
          message: 'Upload file error',
          description: `${info.file.name} file upload failed.`,
        });
      }
    };

    return (
      <div style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Row gutter={10}>
          <Col span={8}>
            <Input
              value={searchText}
              onChange={(e) => {
                searchTextChanged(e.target.value);
              }}
              placeholder="SID or Name"
            />
          </Col>
          <Col span={16}>
            <span>
              <Button
                shape="circle"
                icon="search"
                onClick={() => fetchParticipants()}
                style={{ marginRight: 15 }}
                disabled={buttonDisabled}
              />
              <Upload {...uploadProps}>
                <Button
                  type="primary"
                  shape="circle"
                  icon="upload"
                  disabled={buttonDisabled}
                />
              </Upload>
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              dataSource={participants}
              style={{ marginTop: 20 }}
              rowKey="id"
              loading={loading}
              pagination={{
                total: count,
                current: currentPage,
                pageSize,
              }}
              onChange={pagination => pageChanged(pagination.current)}
              size="middle"
            >
              <Column
                title="Old SID"
                dataIndex="Student.oldSid"
              />
              <Column
                title="New SID"
                dataIndex="Student.newSid"
              />
              <Column
                title="Name"
                dataIndex="Student.name"
              />
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

ParticipantList.propTypes = {
  fetchParticipants: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  searchTextChanged: PropTypes.func.isRequired,
  pageChanged: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  participants: PropTypes.arrayOf(PropTypes.shape({
    participantname: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  seminarId: PropTypes.number.isRequired,
};

const mapStateToProps = state => (
  {
    participants: state.seminarReducers.participants.rows,
    count: state.seminarReducers.participants.count,
    searchText: state.seminarReducers.participantSearch.searchText,
    pageSize: state.seminarReducers.participantSearch.pageSize,
    currentPage: state.seminarReducers.participantSearch.currentPage,
    loading: state.seminarReducers.participantSearch.loading,
    seminarId: state.seminarReducers.seminarSelection.rowKeys[0],
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchParticipants: () => {
      dispatch({
        type: 'FETCH_PARTICIPANTS_LOGIC',
      });
    },
    searchTextChanged: value => (
      dispatch({
        type: 'PARTICIPANT_SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
    pageChanged: currentPage => (
      dispatch({
        type: 'PARTICIPANT_PAGE_CHANGED_LOGIC',
        payload: currentPage,
      })
    ),
  }
);

const ParticipantListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ParticipantList);

export default ParticipantListWrapper;
