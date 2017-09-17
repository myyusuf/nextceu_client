import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Modal from 'antd/lib/modal';
import moment from 'moment';

import SglWindow from './SglWindow';

const Column = Table.Column;
const confirm = Modal.confirm;

class SglList extends Component {
  componentWillMount() {
    // this.props.fetchSgls();
  }

  render() {
    const {
      sgls,
      fetchSgls,
      openAddWindow,
      openEditWindow,
      confirmDelete,
      loading,
    } = this.props;
    return (
      <div style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Row gutter={10}>
          <Col span={16}>
            <span>
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
            <Table dataSource={sgls} style={{ marginTop: 15 }} rowKey="id" loading={loading} size="middle">
              <Column
                title="Completed"
                dataIndex="completed"
                render={(text, record) => (
                  <span>
                    <Checkbox checked={record.completed} />
                  </span>
                )}
              />
              <Column
                title="Type"
                dataIndex="SglType.name"
              />
              <Column
                title="Date"
                dataIndex="problemDate"
                key="problemDate"
                render={(text, record) => (
                  <span>
                    {moment(text).format('DD/MM/YYYY')}
                  </span>
                )}
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

        <SglWindow />
      </div>
    );
  }
}

SglList.propTypes = {
  fetchSgls: PropTypes.func.isRequired,
  openAddWindow: PropTypes.func.isRequired,
  openEditWindow: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  sgls: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = state => (
  {
    sgls: state.studentReducers.sgls,
    loading: state.studentReducers.sglSearch.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchSgls: () => (
      dispatch({
        type: 'FETCH_SGLS_LOGIC',
      })
    ),
    openAddWindow: () => {
      dispatch({
        type: 'FETCH_SGTS_LOGIC',
      });

      dispatch({
        type: 'EDIT_SGL_LOGIC',
      });
    },
    openEditWindow: (record) => {
      dispatch({
        type: 'FETCH_SGTS_LOGIC',
      });

      dispatch({
        type: 'LOAD_SGL_TO_FORM_LOGIC',
        payload: record,
      });
    },
    searchTextChanged: value => (
      dispatch({
        type: 'SGL_SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
    confirmDelete: record => (
      confirm({
        title: 'Do you Want to delete SGL ?.',
        content: 'This action cannot be undone',
        onOk() {
          dispatch({
            type: 'DELETE_SGL_LOGIC',
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

const SglListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SglList);

export default SglListWrapper;
