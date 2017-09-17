import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Modal from 'antd/lib/modal';

import PengampuWindow from './PengampuWindow';

const Column = Table.Column;
const confirm = Modal.confirm;

class PengampuList extends Component {
  componentWillMount() {
    this.props.fetchPengampus();
  }

  render() {
    const {
      pengampus,
      count,
      pageSize,
      currentPage,
      fetchPengampus,
      openAddWindow,
      openEditWindow,
      confirmDelete,
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
              placeholder="Code or Name"
            />
          </Col>
          <Col span={16}>
            <span>
              <Button
                shape="circle"
                icon="search"
                onClick={() => fetchPengampus()}
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
            <Table
              dataSource={pengampus}
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
                title="Department"
                dataIndex="Department.name"
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

        <PengampuWindow />
      </div>
    );
  }
}

PengampuList.propTypes = {
  fetchPengampus: PropTypes.func.isRequired,
  openAddWindow: PropTypes.func.isRequired,
  openEditWindow: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  searchTextChanged: PropTypes.func.isRequired,
  pageChanged: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pengampus: PropTypes.arrayOf(PropTypes.shape).isRequired,
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

const mapStateToProps = state => (
  {
    pengampus: state.pengampuReducers.pengampus.rows,
    count: state.pengampuReducers.pengampus.count,
    searchText: state.pengampuReducers.pengampuSearch.searchText,
    pageSize: state.pengampuReducers.pengampuSearch.pageSize,
    currentPage: state.pengampuReducers.pengampuSearch.currentPage,
    loading: state.pengampuReducers.pengampuSearch.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchPengampus: () => {
      dispatch({
        type: 'FETCH_PENGAMPUS_LOGIC',
      });

      dispatch({
        type: 'FETCH_ALL_HOSPITALS_LOGIC',
      });

      dispatch({
        type: 'FETCH_ALL_DEPARTMENTS_LOGIC',
      });
    },
    openAddWindow: () => (
      dispatch({
        type: 'EDIT_PENGAMPU_LOGIC',
      })
    ),
    openEditWindow: record => (
      dispatch({
        type: 'LOAD_PENGAMPU_TO_FORM_LOGIC',
        payload: record,
      })
    ),
    searchTextChanged: value => (
      dispatch({
        type: 'PENGAMPU_SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
    pageChanged: currentPage => (
      dispatch({
        type: 'PENGAMPU_PAGE_CHANGED_LOGIC',
        payload: currentPage,
      })
    ),
    confirmDelete: record => (
      confirm({
        title: `Do you Want to delete pengampu: ${record.name}`,
        content: 'This action cannot be undone',
        onOk() {
          dispatch({
            type: 'DELETE_PENGAMPU_LOGIC',
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

const PengampuListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PengampuList);

export default PengampuListWrapper;
