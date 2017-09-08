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

import PortofolioWindow from './PortofolioWindow';

const Column = Table.Column;
const confirm = Modal.confirm;

class PortofolioList extends Component {
  componentWillMount() {
    // this.props.fetchPortofolios();
  }

  render() {
    const {
      portofolios,
      fetchPortofolios,
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
            <Table dataSource={portofolios} style={{ marginTop: 15 }} rowKey="id" loading={loading} size="middle">
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
                title="Title"
                dataIndex="title"
                key="title"
              />
              <Column
                title="Type"
                dataIndex="PortofolioType.name"
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

        <PortofolioWindow />
      </div>
    );
  }
}

PortofolioList.propTypes = {
  fetchPortofolios: PropTypes.func.isRequired,
  openAddWindow: PropTypes.func.isRequired,
  openEditWindow: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  portofolios: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = state => (
  {
    portofolios: state.studentReducers.portofolios,
    loading: state.studentReducers.portofolioSearch.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchPortofolios: () => (
      dispatch({
        type: 'FETCH_PORTOFOLIOS_LOGIC',
      })
    ),
    openAddWindow: () => {
      dispatch({
        type: 'FETCH_PFTS_LOGIC',
      });

      dispatch({
        type: 'EDIT_PORTOFOLIO_LOGIC',
      });
    },
    openEditWindow: (record) => {
      dispatch({
        type: 'FETCH_PFTS_LOGIC',
      });

      dispatch({
        type: 'LOAD_PORTOFOLIO_TO_FORM_LOGIC',
        payload: record,
      });
    },
    searchTextChanged: value => (
      dispatch({
        type: 'PORTOFOLIO_SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
    confirmDelete: record => (
      confirm({
        title: 'Do you Want to delete portofolio ?.',
        content: 'This action cannot be undone',
        onOk() {
          dispatch({
            type: 'DELETE_PORTOFOLIO_LOGIC',
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

const PortofolioListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PortofolioList);

export default PortofolioListWrapper;
