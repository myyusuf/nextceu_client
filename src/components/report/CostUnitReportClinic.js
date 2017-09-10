import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import DatePicker from 'antd/lib/date-picker';
import numeral from 'numeral';
import HospitalSelect from '../hospital/HospitalSelect';

const Column = Table.Column;
const RangePicker = DatePicker.RangePicker;

class CostUnitClinicReport extends Component {
  componentWillMount() {
    this.props.fetchCostUnitsClinic();
  }

  render() {
    const {
      costUnits,
      fetchCostUnitsClinic,
      dateRange,
      dateRangeChanged,
      hospital,
      hospitalChanged,
      loading,
    } = this.props;
    return (
      <div style={{ paddingLeft: 10, paddingRight: 10 }}>
        <Row gutter={10}>
          <Col span={6}>
            <RangePicker
              value={dateRange}
              onChange={(date) => {
                dateRangeChanged(date);
              }}
            />
          </Col>
          <Col span={7}>
            <HospitalSelect
              hospitalType="clinic"
              value={hospital}
              onSelect={(value) => {
                hospitalChanged(value);
              }}
              style={{ width: '100%', marginBottom: 5 }}
            />
          </Col>
          <Col span={10}>
            <span>
              <Button
                shape="circle"
                icon="search"
                onClick={() => fetchCostUnitsClinic()}
                style={{ marginRight: 15 }}
              />
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              dataSource={costUnits}
              style={{ marginTop: 20, width: 1000 }}
              rowKey="id"
              loading={loading}
              size="middle"
              scroll={{ x: 1350 }}
            >
              <Column
                title="Department"
                dataIndex="Department.name"
                fixed="left"
                width={100}
              />
              <Column
                title="Name"
                dataIndex="Student.name"
                fixed="left"
                width={100}
              />
              <Column
                title="Duration"
                dataIndex="courseDuration"
                fixed="left"
                width={100}
              />
              <Column
                title="NST. Fee/Week"
                dataIndex="fee1"
                width={100}
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="DIR (20rb)"
                dataIndex="fee2"
                width={100}
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="BKD (20rb)"
                dataIndex="fee3"
                width={100}
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="KDI (5rb)"
                dataIndex="fee4"
                width={100}
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="DPK"
                dataIndex="dpk.name"
                width={100}
              />
              <Column
                title="DPK (50rb)"
                dataIndex="fee6"
                width={100}
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="Total"
                dataIndex="total"
                fixed="right"
                width={100}
                render={text => (numeral(text).format('0,0.00'))}
              />
            </Table>
          </Col>
        </Row>

      </div>
    );
  }
}

CostUnitClinicReport.propTypes = {
  fetchCostUnitsClinic: PropTypes.func.isRequired,
  dateRange: PropTypes.string.isRequired,
  dateRangeChanged: PropTypes.func.isRequired,
  hospital: PropTypes.string.isRequired,
  hospitalChanged: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  costUnits: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

// CostUnitClinicReport.defaultProps = {
//   searchText: '',
// };

const mapStateToProps = state => (
  {
    costUnits: state.reportReducers.costUnitsClinic,
    dateRange: state.reportReducers.costUnitSearchClinic.dateRange,
    hospital: state.reportReducers.costUnitSearchClinic.hospital,
    loading: state.reportReducers.costUnitSearchClinic.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchCostUnitsClinic: () => {
      dispatch({
        type: 'FETCH_COST_UNITS_CLINIC_LOGIC',
      });

      dispatch({
        type: 'FETCH_ALL_HOSPITALS_LOGIC',
      });
    },
    dateRangeChanged: value => (
      dispatch({
        type: 'COST_UNIT_CLINIC_DATE_RANGE_CHANGED',
        payload: value,
      })
    ),
    hospitalChanged: value => (
      dispatch({
        type: 'COST_UNIT_CLINIC_HOSPITAL_CHANGED',
        payload: value,
      })
    ),
  }
);

const CostUnitClinicReportWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CostUnitClinicReport);

export default CostUnitClinicReportWrapper;
