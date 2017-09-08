import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import DatePicker from 'antd/lib/date-picker';

const Column = Table.Column;

class PreTestReport extends Component {
  componentWillMount() {
    this.props.fetchPreTests();
  }

  render() {
    const {
      preTests,
      count,
      pageSize,
      currentPage,
      fetchPreTests,
      openExportWindow,
      searchText,
      searchTextChanged,
      pageChanged,
      loading,
      dateSelected,
      dateChanged,
      selectedRowKeys,
      rowKeysChanged,
    } = this.props;

    const rowSelection = {
      type: 'checkbox',
      selectedRowKeys,
      onChange: (rowKeys, selectedRows) => {
        rowKeysChanged(rowKeys, selectedRows);
      },
    };

    return (
      <div style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Row gutter={10}>
          <Col span={4}>
            <DatePicker
              value={dateSelected}
              onChange={(date) => {
                dateChanged(date);
              }}
              style={{ width: '100%' }}
            />
          </Col>
          <Col span={6}>
            <Input
              value={searchText}
              onChange={(e) => {
                searchTextChanged(e.target.value);
              }}
              placeholder="SID or Name"
            />
          </Col>
          <Col span={8}>
            <span>
              <Button
                shape="circle"
                icon="search"
                onClick={() => fetchPreTests()}
                style={{ marginRight: 15 }}
              />
              <Button
                type="danger"
                shape="circle"
                icon="delete"
                onClick={() => openExportWindow()}
              />
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              dataSource={preTests}
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
              rowSelection={rowSelection}
            >
              <Column
                title="Title"
                dataIndex="title"
                key="title"
              />
              <Column
                title="End Date"
                dataIndex="realEndDate"
                key="realEndDate"
                render={(text, record) => (
                  <span>
                    {moment(text).format('DD/MM/YYYY')}
                  </span>
                )}
              />
              <Column
                title="Old SID"
                dataIndex="Student.oldSid"
              />
              <Column
                title="New SID"
                dataIndex="Student.newSid"
              />
              <Column
                title="Name"
                dataIndex="Student.name"
              />
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

PreTestReport.propTypes = {
  fetchPreTests: PropTypes.func.isRequired,
  openExportWindow: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  searchTextChanged: PropTypes.func.isRequired,
  pageChanged: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  preTests: PropTypes.arrayOf(PropTypes.shape).isRequired,
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  dateChanged: PropTypes.func.isRequired,
  dateSelected: PropTypes.arrayOf(PropTypes.shape).isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.shape).isRequired,
  rowKeysChanged: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    preTests: state.reportReducers.preTests.rows,
    count: state.reportReducers.preTests.count,
    searchText: state.reportReducers.preTestSearch.searchText,
    pageSize: state.reportReducers.preTestSearch.pageSize,
    currentPage: state.reportReducers.preTestSearch.currentPage,
    loading: state.reportReducers.preTestSearch.loading,
    dateSelected: state.reportReducers.preTestSearch.dateSelected,
    selectedRowKeys: state.reportReducers.preTestSelection.rowKeys,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchPreTests: () => {
      dispatch({
        type: 'FETCH_PRE_TESTS_LOGIC',
      });
    },
    openExportWindow: () => (
      dispatch({
        type: 'PREP_EXPORT_TO_PRE_TEST_LOGIC',
      })
    ),
    searchTextChanged: value => (
      dispatch({
        type: 'PRE_TEST_SEARCH_TEXT_CHANGED',
        payload: value,
      })
    ),
    pageChanged: currentPage => (
      dispatch({
        type: 'PRE_TEST_PAGE_CHANGED_LOGIC',
        payload: currentPage,
      })
    ),
    dateChanged: value => (
      dispatch({
        type: 'PRE_TEST_SEARCH_DATE_CHANGED',
        payload: value,
      })
    ),
    rowKeysChanged: (rowKeys, selectedRows) => (
      dispatch({
        type: 'PRE_TEST_SELECT_CHANGED',
        payload: { rowKeys, selectedRows },
      })
    ),
  }
);

const PreTestReportWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PreTestReport);

export default PreTestReportWrapper;
