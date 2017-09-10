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

class CostUnitReport extends Component {
  componentWillMount() {
    this.props.fetchCostUnits();
  }

  render() {
    const {
      costUnits,
      fetchCostUnits,
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
              hospitalType="hospital"
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
                onClick={() => fetchCostUnits()}
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
                title="Adviser"
                dataIndex="adviser.name"
                width={100}
              />
              <Column
                title="Adviser (50rb)"
                dataIndex="fee6"
                width={100}
                render={text => (numeral(text).format('0,0.00'))}
              />
              <Column
                title="Examiner"
                dataIndex="examiner.name"
                width={100}
              />
              <Column
                title="Examiner (500rb)"
                dataIndex="fee7"
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

CostUnitReport.propTypes = {
  fetchCostUnits: PropTypes.func.isRequired,
  dateRange: PropTypes.string.isRequired,
  dateRangeChanged: PropTypes.func.isRequired,
  hospital: PropTypes.string.isRequired,
  hospitalChanged: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  costUnits: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

// CostUnitReport.defaultProps = {
//   searchText: '',
// };

const mapStateToProps = state => (
  {
    costUnits: state.reportReducers.costUnits,
    dateRange: state.reportReducers.costUnitSearch.dateRange,
    hospital: state.reportReducers.costUnitSearch.hospital,
    loading: state.reportReducers.costUnitSearch.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchCostUnits: () => {
      dispatch({
        type: 'FETCH_COST_UNITS_LOGIC',
      });

      dispatch({
        type: 'FETCH_ALL_HOSPITALS_LOGIC',
      });
    },
    dateRangeChanged: value => (
      dispatch({
        type: 'COST_UNIT_DATE_RANGE_CHANGED',
        payload: value,
      })
    ),
    hospitalChanged: value => (
      dispatch({
        type: 'COST_UNIT_HOSPITAL_CHANGED',
        payload: value,
      })
    ),
  }
);

const CostUnitReportWrapper = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CostUnitReport);

export default CostUnitReportWrapper;
