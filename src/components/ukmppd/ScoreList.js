import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Checkbox from 'antd/lib/checkbox';
import Modal from 'antd/lib/modal';
import moment from 'moment';

const Column = Table.Column;
const confirm = Modal.confirm;

const ScoreList = ({ kompreType, kompres, loading, openEditWindow, confirmDelete }) => {
  const filteredKompres = kompres.filter(kompre => kompre.KompreType.code === kompreType);

  return (
    <div>
      <Table dataSource={filteredKompres} style={{ marginTop: 5 }} rowKey="id" loading={loading} size="middle">
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
          render={text => (
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
    </div>
  );
};

ScoreList.propTypes = {
  kompreType: PropTypes.string.isRequired,
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
    openEditWindow: (record) => {
      dispatch({
        type: 'FETCH_UPTS_LOGIC',
      });

      dispatch({
        type: 'LOAD_KOMPRE_TO_FORM_LOGIC',
        payload: record,
      });
    },
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

const ScoreListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScoreList);

export default ScoreListWrapper;
