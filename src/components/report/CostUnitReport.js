import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';

const Column = Table.Column;

class CostUnitReport extends Component {
  componentWillMount() {
    this.props.fetchCostUnits();
  }

  render() {
    const {
      costUnits,
      fetchCostUnits,
      searchText,
      searchTextChanged,
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
              placeholder="Code or Name"
            />
          </Col>
          <Col span={16}>
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
            <Table dataSource={costUnits} style={{ marginTop: 20 }} rowKey="id" loading={loading} size="middle">
              <Column
                title="Department"
                dataIndex="Department.name"
              />
              <Column
                title="Duration"
                dataIndex="duration"
              />
              <Column
                title="Name"
                dataIndex="name"
              />
              <Column
                title="NST. Fee/Week"
                dataIndex="fee1"
              />
              <Column
                title="DIR (20rb)"
                dataIndex="fee2"
              />
              <Column
                title="BKD (20rb)"
                dataIndex="fee3"
              />
              <Column
                title="KDI (5rb)"
                dataIndex="fee4"
              />
              <Column
                title="DPK (50rb)"
                dataIndex="fee5"
              />
              <Column
                title="PEMBBG (50rb)"
                dataIndex="fee6"
              />
              <Column
                title="Penguji (500rb)"
                dataIndex="fee7"
              />
              <Column
                title="Total"
                dataIndex="total"
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
  searchText: PropTypes.string.isRequired,
  searchTextChanged: PropTypes.func.isRequired,
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
    searchText: state.reportReducers.costUnitSearch.searchText,
    loading: state.reportReducers.costUnitSearch.loading,
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchCostUnits: () => (
      dispatch({
        type: 'FETCH_COST_UNITS_LOGIC',
      })
    ),
    searchTextChanged: value => (
      dispatch({
        type: 'COST_UNIT_SEARCH_TEXT_CHANGED',
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
