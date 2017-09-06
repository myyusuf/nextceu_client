import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import moment from 'moment';

import ScoreWindow from './ScoreWindow';

const Column = Table.Column;
const confirm = Modal.confirm;

class ScoreList extends Component {
  componentWillMount() {
    // this.props.fetchScores();
  }

  render() {
    const {
      scores,
      fetchScores,
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
            <Table dataSource={scores} style={{ marginTop: 20 }} rowKey="id" loading={loading} size="middle">
              <Column
                title="Value"
                dataIndex="scoreValue"
                key="scoreValue"
              />
              <Column
                title="Type"
                dataIndex="ScoreType.name"
              />
              <Column
                title="Date"
                dataIndex="scoreDate"
                key="scoreDate"
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

        <ScoreWindow />
      </div>
    );
  }
}

ScoreList.propTypes = {
  fetchScores: PropTypes.func.isRequired,
  openAddWindow: PropTypes.func.isRequired,
  openEditWindow: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  scores: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = state => (
  {
    scores: state.studentReducers.scores,
    loading: state.studentReducers.scoreSearch.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchScores: () => (
      dispatch({
        type: 'FETCH_SCORES_LOGIC',
      })
    ),
    openAddWindow: () => {
      dispatch({
        type: 'FETCH_SCORE_TYPES_LOGIC',
      });

      dispatch({
        type: 'EDIT_SCORE_LOGIC',
      });
    },
    openEditWindow: (record) => {
      dispatch({
        type: 'FETCH_SCORE_TYPES_LOGIC',
      });

      dispatch({
        type: 'LOAD_SCORE_TO_FORM_LOGIC',
        payload: record,
      });
    },
    searchTextChanged: value => (
      dispatch({
        type: 'SCORE_SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
    confirmDelete: record => (
      confirm({
        title: 'Do you Want to delete score',
        content: 'This action cannot be undone',
        onOk() {
          dispatch({
            type: 'DELETE_SCORE_LOGIC',
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
