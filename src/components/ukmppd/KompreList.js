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

import KompreWindow from './KompreWindow';

const Column = Table.Column;
const confirm = Modal.confirm;

class KompreList extends Component {
  componentWillMount() {
    // this.props.fetchKompres();
  }

  render() {
    const {
      kompres,
      fetchKompres,
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
            <Table dataSource={kompres} style={{ marginTop: 15 }} rowKey="id" loading={loading} size="middle">
              <Column
                title="Selected"
                dataIndex="selected"
                render={(text, record) => (
                  <span>
                    <Checkbox checked={record.selected} />
                  </span>
                )}
              />
              <Column
                title="Score"
                dataIndex="score"
              />
              <Column
                title="Type"
                dataIndex="KompreType.name"
              />
              <Column
                title="Date"
                dataIndex="kompreDate"
                key="kompreDate"
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

        <KompreWindow />
      </div>
    );
  }
}

KompreList.propTypes = {
  fetchKompres: PropTypes.func.isRequired,
  openAddWindow: PropTypes.func.isRequired,
  openEditWindow: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  kompres: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

const mapStateToProps = state => (
  {
    kompres: state.ukmppdReducers.kompres,
    loading: state.ukmppdReducers.kompreSearch.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchKompres: () => (
      dispatch({
        type: 'FETCH_KOMPRES_LOGIC',
      })
    ),
    openAddWindow: () => {
      dispatch({
        type: 'FETCH_UPTS_LOGIC',
      });

      dispatch({
        type: 'EDIT_KOMPRE_LOGIC',
      });
    },
    openEditWindow: (record) => {
      dispatch({
        type: 'FETCH_UPTS_LOGIC',
      });

      dispatch({
        type: 'LOAD_KOMPRE_TO_FORM_LOGIC',
        payload: record,
      });
    },
    searchTextChanged: value => (
      dispatch({
        type: 'KOMPRE_SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
    confirmDelete: record => (
      confirm({
        title: 'Do you Want to delete kompre ?.',
        content: 'This action cannot be undone',
        onOk() {
          dispatch({
            type: 'DELETE_KOMPRE_LOGIC',
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

const KompreListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(KompreList);

export default KompreListWrapper;
