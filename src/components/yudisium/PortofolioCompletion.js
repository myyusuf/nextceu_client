import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';

const Column = Table.Column;

const PortofolioCompletion = ({ portofolioCompletions, loading }) => {
  return (
    <div style={{ paddingLeft: 10, paddingRight: 10 }}>
      <Row>
        <Col span={24}>
          <Table dataSource={portofolioCompletions} style={{ marginTop: 20 }} rowKey="id" loading={loading} size="middle">
            <Column
              title="Title"
              dataIndex="title"
            />
            <Column
              title="Department"
              dataIndex="Department.name"
            />
            <Column
              title="Total"
              key="total"
              render={(text, record) => (
                record.portofolioCompletions.length
              )}
            />
          </Table>
        </Col>
      </Row>
    </div>
  );
};

PortofolioCompletion.propTypes = {
  portofolioCompletions: PropTypes.arrayOf(PropTypes.shape).isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => (
  {
    portofolioCompletions: state.yudisiumReducers.portofolioCompletion.portofolioCompletions,
    loading: state.yudisiumReducers.portofolioCompletion.loading,
  }
);

const PortofolioCompletionWrapper = connect(
  mapStateToProps,
  null,
)(PortofolioCompletion);

export default PortofolioCompletionWrapper;
