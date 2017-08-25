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
];

const UploadList = ({ uploads, openAddWindow, searchText, searchTextChanged }) => (
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
          icon="upload"
          onClick={() => openAddWindow()}
        />
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <Table columns={columns} dataSource={uploads} style={{ marginTop: 20 }} />
      </Col>
    </Row>
  </div>
);

UploadList.propTypes = {
  openAddWindow: PropTypes.func.isRequired,
  searchText: PropTypes.string,
  searchTextChanged: PropTypes.func.isRequired,
  uploads: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
  })).isRequired,
};

UploadList.defaultProps = {
  searchText: '',
};

const mapStateToProps = state => (
  {
    uploads: state.seminarReducers.uploads,
  }
);

const mapDispatchToProps = dispatch => (
  {
    openAddWindow: () => (
      dispatch({
        type: 'ADD_UPLOAD_LOGIC',
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

const UploadListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UploadList);

export default UploadListWrapper;
