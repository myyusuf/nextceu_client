import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Modal from 'antd/lib/modal';

const Column = Table.Column;
const confirm = Modal.confirm;

class PreTestReport extends Component {
  componentWillMount() {
    this.props.fetchPreTestReports();
  }

  render() {
    const {
      preTestReports,
      count,
      pageSize,
      currentPage,
      fetchPreTestReports,
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
                onClick={() => fetchPreTestReports()}
                style={{ marginRight: 15 }}
              />
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              dataSource={preTestReports}
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
                title="Old SID"
                dataIndex="oldSid"
                key="oldSid"
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

        <PreTestReportWindow />
      </div>
    );
  }
}

PreTestReport.propTypes = {
  fetchPreTestReports: PropTypes.func.isRequired,
  openAddWindow: PropTypes.func.isRequired,
  openEditWindow: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  searchTextChanged: PropTypes.func.isRequired,
  pageChanged: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  preTestReports: PropTypes.arrayOf(PropTypes.shape({
    preTestReportname: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

const mapStateToProps = state => (
  {
    preTestReports: state.preTestReportReducers.preTestReports.rows,
    count: state.preTestReportReducers.preTestReports.count,
    searchText: state.preTestReportReducers.preTestReportSearch.searchText,
    pageSize: state.preTestReportReducers.preTestReportSearch.pageSize,
    currentPage: state.preTestReportReducers.preTestReportSearch.currentPage,
    loading: state.preTestReportReducers.preTestReportSearch.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchPreTestReports: () => {
      dispatch({
        type: 'FETCH_USERS_LOGIC',
      });

      dispatch({
        type: 'FETCH_ALL_ROLES_LOGIC',
      });
    },
    openAddWindow: () => (
      dispatch({
        type: 'EDIT_USER_LOGIC',
      })
    ),
    openEditWindow: record => (
      dispatch({
        type: 'LOAD_USER_TO_FORM_LOGIC',
        payload: record,
      })
    ),
    searchTextChanged: value => (
      dispatch({
        type: 'USER_SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
    pageChanged: currentPage => (
      dispatch({
        type: 'USER_PAGE_CHANGED_LOGIC',
        payload: currentPage,
      })
    ),
    confirmDelete: record => (
      confirm({
        title: `Do you Want to delete preTestReport: ${record.name}`,
        content: 'This action cannot be undone',
        onOk() {
          dispatch({
            type: 'DELETE_USER_LOGIC',
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

const PreTestReportWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PreTestReport);

export default PreTestReportWrapper;
