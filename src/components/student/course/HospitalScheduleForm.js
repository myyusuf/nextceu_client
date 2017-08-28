import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import DatePicker from 'antd/lib/date-picker';

const Column = Table.Column;
const RangePicker = DatePicker.RangePicker;

class HospitalScheduleForm extends Component {
  componentWillMount() {
    this.props.fetchHospitalSchedules();
  }

  render() {
    const {
      fetchHospitalSchedules,
      hospitalSchedules,
      dateRange,
      dateRangeChanged,
      loading,
    } = this.props;
    return (
      <div style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Row gutter={10}>
          <Col span={8}>
            <RangePicker
              value={dateRange.value}
              onChange={(date) => {
                dateRangeChanged(date);
              }}
              style={{ width: '100%' }}
            />
          </Col>
          <Col span={16}>
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
            <Table dataSource={hospitalSchedules} style={{ marginTop: 20 }} rowKey="id" loading={loading}>
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
};

const mapStateToProps = state => (
  {
    hospitalSchedules: state.studentReducers.hospitalSchedules,
    dateRange: state.studentReducers.hospitalScheduleSearch.dateRange,
    loading: state.studentReducers.hospitalScheduleSearch.loading,
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
  }
);

const HospitalScheduleFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HospitalScheduleForm);

export default HospitalScheduleFormWrapper;
