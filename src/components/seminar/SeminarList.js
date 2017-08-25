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
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
];

const SeminarList = ({ seminars, openAddWindow, searchText, searchTextChanged }) => (
  <div style={{ paddingLeft: 10, paddingRight: 10 }}>
    <Row gutter={10}>
      <Col span={12}>
        <Input
          value={searchText}
          onChange={(e) => {
            searchTextChanged(e.target.value);
          }}
          placeholder="Code"
        />
      </Col>
      <Col span={12}>
        <Button
          type="primary"
          shape="circle"
          icon="plus"
          onClick={() => openAddWindow()}
        />
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <Table columns={columns} dataSource={seminars} style={{ marginTop: 20 }} />
      </Col>
    </Row>
  </div>
);

SeminarList.propTypes = {
  openAddWindow: PropTypes.func.isRequired,
  searchText: PropTypes.string,
  searchTextChanged: PropTypes.func.isRequired,
  seminars: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

SeminarList.defaultProps = {
  searchText: '',
};

const mapStateToProps = state => (
  {
    seminars: state.seminarReducers.seminars,
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

const SeminarListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeminarList);

export default SeminarListWrapper;
