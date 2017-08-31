import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Badge from 'antd/lib/badge';
import DatePicker from 'antd/lib/date-picker';

const Column = Table.Column;
const RangePicker = DatePicker.RangePicker;

class HospitalScheduleForm extends Component {
  componentWillMount() {
    // this.props.fetchHospitalSchedules();
  }

  render() {
    const {
      fetchHospitalSchedules,
      hospitalSchedules,
      dateRange,
      dateRangeChanged,
      loading,
      selectedRowKeys,
      rowKeysChanged,
    } = this.props;

    const rowSelection = {
      type: 'radio',
      selectedRowKeys,
      onChange: (rowKeys, selectedRows) => {
        rowKeysChanged(rowKeys, selectedRows);
      },
    };
    return (
      <div style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Row gutter={10}>
          <Col span={12}>
            <RangePicker
              value={dateRange}
              onChange={(date) => {
                dateRangeChanged(date);
              }}
              style={{ width: '100%' }}
            />
          </Col>
          <Col span={12}>
            <span>
              <Button
                shape="circle"
                icon="search"
                onClick={() => fetchHospitalSchedules()}
                style={{ marginRight: 15 }}
              />
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              dataSource={hospitalSchedules}
              style={{ marginTop: 20 }}
              rowKey="id"
              loading={loading}
              size="small"
              rowSelection={rowSelection}
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
                title="Quota"
                dataIndex="departmentQuota"
                key="departmentQuota"
                render={text => (
                  <Badge
                    count={text}
                    overflowCount={1000}
                    showZero
                    style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }}
                  />
                )}
              />
              <Column
                title="Students"
                dataIndex="studentsInDepartmentCount"
                key="studentsInDepartmentCount"
                render={(text, record) => {
                  const departmentQuota = parseInt(record.departmentQuota, 10);
                  const studentsInDepartmentCount = parseInt(text, 10);
                  if (studentsInDepartmentCount <= departmentQuota) {
                    return (
                      <Badge
                        count={text}
                        overflowCount={1000}
                        showZero
                        style={{ backgroundColor: '#87d068' }}
                      />
                    );
                  }

                  return (
                    <Badge
                      count={text}
                      overflowCount={1000}
                      showZero
                    />
                  );
                }}
              />
              <Column
                title="History"
                dataIndex="studentHistoryCount"
                key="studentHistoryCount"
                render={text => (<span style={{ width: '100%', textAlign: 'center ' }}>
                  {text}
                </span>)}
              />
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

HospitalScheduleForm.propTypes = {
  dateRangeChanged: PropTypes.func.isRequired,
  fetchHospitalSchedules: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  hospitalSchedules: PropTypes.arrayOf(PropTypes.shape).isRequired,
  dateRange: PropTypes.arrayOf(PropTypes.shape).isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.shape).isRequired,
  rowKeysChanged: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    hospitalSchedules: state.studentReducers.hospitalSchedules,
    dateRange: state.studentReducers.hospitalScheduleSearch.dateRange,
    loading: state.studentReducers.hospitalScheduleSearch.loading,
    selectedRowKeys: state.studentReducers.hospitalScheduleSelection.rowKeys,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchHospitalSchedules: () => (
      dispatch({
        type: 'FETCH_HOSPITAL_SCHEDULES_LOGIC',
      })
    ),
    dateRangeChanged: value => (
      dispatch({
        type: 'HOSPITAL_SCHEDULE_DATE_RANGE_CHANGED',
        payload: value,
      })
    ),
    rowKeysChanged: (rowKeys, selectedRows) => (
      dispatch({
        type: 'HOSPITAL_SCHEDULE_SELECT_CHANGED',
        payload: { rowKeys, selectedRows },
      })
    ),
  }
);

const HospitalScheduleFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HospitalScheduleForm);

export default HospitalScheduleFormWrapper;
