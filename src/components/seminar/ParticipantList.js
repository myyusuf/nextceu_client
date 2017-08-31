import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';

const Column = Table.Column;

class ParticipantList extends Component {
  componentWillMount() {
    this.props.fetchParticipants();
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
    } = this.props;
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
              />
              <Button
                type="primary"
                shape="circle"
                icon="upload"
              />
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
            >
              <Column
                title="Old SID"
                dataIndex="oldSid"
                key="oldSid"
              />
              <Column
                title="New SID"
                dataIndex="newSid"
                key="newSid"
              />
              <Column
                title="Name"
                dataIndex="name"
                key="name"
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
};

const mapStateToProps = state => (
  {
    participants: state.seminarReducers.participants.rows,
    count: state.seminarReducers.participants.count,
    searchText: state.seminarReducers.participantSearch.searchText,
    pageSize: state.seminarReducers.participantSearch.pageSize,
    currentPage: state.seminarReducers.participantSearch.currentPage,
    loading: state.seminarReducers.participantSearch.loading,
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
