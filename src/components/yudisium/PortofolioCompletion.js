import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import numeral from 'numeral';

const Column = Table.Column;

const PortofolioCompletion = ({ portofolioCompletions, loading }) => {
  return (
    <div style={{ paddingLeft: 10, paddingRight: 10 }}>
      <Row>
        <Col span={24}>
          <Table dataSource={portofolioCompletions} style={{ marginTop: 20 }} rowKey="id" loading={loading} size="middle">
            <Column
              title="Title"
              dataIndex="course.title"
            />
            <Column
              title="Department"
              dataIndex="course.Department.name"
            />
            <Column
              title="Total"
              key="total"
              render={(text, record) => (
                record.portofolios.length
              )}
            />
            <Column
              title="Competed"
              key="completed"
              render={(text, record) => (
                record.portofolios.length > 0 ?
                record.portofolios.filter(portofolio => (portofolio.completed)).length :
                '-'
              )}
            />
            <Column
              title="Completion"
              key="cmpletions"
              render={(text, record) => {
                if (record.portofolios.length > 0) {
                  const percentage =
                  (record.portofolios.filter(portofolio => (portofolio.completed)).length
                  / record.portofolios.length) * 100;
                  return `${numeral(percentage).format('0,0')}%`;
                }

                return '-';
              }}
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
