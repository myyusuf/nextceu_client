import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';

const columns = [
  {
    title: 'Old SID',
    dataIndex: 'oldSid',
    key: 'oldSid',
  },
  {
    title: 'New SID',
    dataIndex: 'newSid',
    key: 'newSid',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
];

const ParticipantList = ({ participants, openAddWindow, searchText, searchTextChanged }) => (
  <div style={{ paddingLeft: 10, paddingRight: 10 }}>
    <Row gutter={10}>
      <Col span={12}>
        <Input
          value={searchText}
          onChange={(e) => {
            searchTextChanged(e.target.value);
          }}
          placeholder="SID or Name"
        />
      </Col>
      <Col span={12}>
        <Button
          type="primary"
          shape="circle"
          icon="upload"
          onClick={() => openAddWindow()}
        />
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <Table columns={columns} dataSource={participants} style={{ marginTop: 20 }} />
      </Col>
    </Row>
  </div>
);

ParticipantList.propTypes = {
  openAddWindow: PropTypes.func.isRequired,
  searchText: PropTypes.string,
  searchTextChanged: PropTypes.func.isRequired,
  participants: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

ParticipantList.defaultProps = {
  searchText: '',
};

const mapStateToProps = state => (
  {
    participants: state.seminarReducers.participants,
  }
);

const mapDispatchToProps = dispatch => (
  {
    openAddWindow: () => (
      dispatch({
        type: 'ADD_SEMINAR_LOGIC',
      })
    ),
    searchTextChanged: value => (
      dispatch({
        type: 'SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
  }
);

const ParticipantListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ParticipantList);

export default ParticipantListWrapper;
