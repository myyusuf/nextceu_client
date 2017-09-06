import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Modal from 'antd/lib/modal';

import CptWindow from './CptWindow';

const Column = Table.Column;
const confirm = Modal.confirm;

class CptList extends Component {
  componentWillMount() {
    this.props.fetchCpts();
  }

  render() {
    const {
      cpts,
      fetchCpts,
      openAddWindow,
      openEditWindow,
      confirmDelete,
      searchText,
      searchTextChanged,
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
              placeholder="Code or Name"
            />
          </Col>
          <Col span={16}>
            <span>
              <Button
                shape="circle"
                icon="search"
                onClick={() => fetchCpts()}
                style={{ marginRight: 15 }}
              />
              <Button
                type="primary"
                shape="circle"
                icon="plus"
                onClick={() => openAddWindow()}
              />
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table dataSource={cpts} style={{ marginTop: 20 }} rowKey="id" loading={loading} size="middle">
              <Column
                title="Code"
                dataIndex="code"
                key="code"
              />
              <Column
                title="Name"
                dataIndex="name"
                key="name"
              />
              <Column
                title="Action"
                key="action"
                render={(text, record) => (
                  <span>
                    <Button
                      icon="edit"
                      onClick={() => openEditWindow(record)}
                      style={{ marginRight: 5 }}
                    />
                    <Button
                      type="danger"
                      icon="delete"
                      onClick={() => confirmDelete(record)}
                    />
                  </span>
                )}
              />
            </Table>
          </Col>
        </Row>

        <CptWindow />
      </div>
    );
  }
}

CptList.propTypes = {
  fetchCpts: PropTypes.func.isRequired,
  openAddWindow: PropTypes.func.isRequired,
  openEditWindow: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  searchTextChanged: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  cpts: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

// CptList.defaultProps = {
//   searchText: '',
// };

const mapStateToProps = state => (
  {
    cpts: state.studentReducers.cpts,
    searchText: state.studentReducers.cptSearch.searchText,
    loading: state.studentReducers.cptSearch.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchCpts: () => (
      dispatch({
        type: 'FETCH_CPTS_LOGIC',
      })
    ),
    openAddWindow: () => (
      dispatch({
        type: 'EDIT_CPT_LOGIC',
      })
    ),
    openEditWindow: record => (
      dispatch({
        type: 'LOAD_CPT_TO_FORM_LOGIC',
        payload: record,
      })
    ),
    searchTextChanged: value => (
      dispatch({
        type: 'CPT_SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
    confirmDelete: record => (
      confirm({
        title: `Do you Want to delete cpt: ${record.name}`,
        content: 'This action cannot be undone',
        onOk() {
          dispatch({
            type: 'DELETE_CPT_LOGIC',
            payload: record,
          });
        },
        onCancel() {
          console.log('Cancel');
        },
      })
    ),
  }
);

const CptListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CptList);

export default CptListWrapper;
